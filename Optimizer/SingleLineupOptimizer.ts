import { Memoizer } from './lib/Memoizer'
import { FantasyLineup } from '../lib/FantasyLineup'
import { InvalidLineup } from '../lib/FantasyLineup'
import { IPlayer } from '../lib/Player'
import { IsValidFunction } from './lib/IsValidFunction'
import { isValidLineup } from './lib/isValidLineup'

interface LineupsIfTakeAndPass {
  lineupIfTake: FantasyLineup|InvalidLineup
  lineupIfPass: FantasyLineup|InvalidLineup
}

export class SingleLineupOptimizer {
  private playerPool: IPlayer[]
  private salaryCap: number
  private rosterSpots: number
  private memoizer: Memoizer = new Memoizer()
  private isValid: IsValidFunction

  constructor(playerPool: IPlayer[], salaryCap: number, rosterSpots: number, isValid: IsValidFunction = () => true) {
    this.playerPool = playerPool
    this.salaryCap = salaryCap
    this.rosterSpots = rosterSpots
    this.isValid = isValid
  }

  public findOptimal = (): FantasyLineup|InvalidLineup => {
    const optimal = this.traverseTakeOrNotTakeTree(0, new FantasyLineup(
      this.salaryCap,
      this.rosterSpots,
      [],
    ))

    if (!optimal) throw new Error('unable to find lineup')
    return optimal
  }

  private traverseTakeOrNotTakeTree = (currentPoolIndex: number, currentLineup: FantasyLineup): FantasyLineup|InvalidLineup => {
    const playersLeft = this.playerPool.length - currentPoolIndex
    const salaryLeft = this.salaryCap - currentLineup.salary
    const rosterSpotsLeft = this.rosterSpots - currentLineup.roster.length

    const isMemoized = this.memoizer.isMemoized(playersLeft, salaryLeft, rosterSpotsLeft)

    if (currentLineup.isComplete) {
      if (!this.isValid(currentLineup)) return InvalidLineup.FAILED_IS_VALID
      return currentLineup
    }

    if (isMemoized) {
      const memoizedLineup = this.memoizer.getLineup(playersLeft, salaryLeft, rosterSpotsLeft)

      if (!isValidLineup(memoizedLineup)) return memoizedLineup
      return currentLineup.combine(memoizedLineup)
    }

    const {lineupIfTake, lineupIfPass} = this.findLineupsIfTakeAndPass(currentPoolIndex, currentLineup)

    return this.bestLineup({lineupIfTake, lineupIfPass})
  }

  private bestLineup = ({lineupIfTake, lineupIfPass}: LineupsIfTakeAndPass): FantasyLineup|InvalidLineup => {
    if (!isValidLineup(lineupIfPass)) return lineupIfTake
    if (!isValidLineup(lineupIfTake)) return lineupIfPass

    return (lineupIfTake as FantasyLineup).projection > (lineupIfPass as FantasyLineup).projection
      ? lineupIfTake
      : lineupIfPass
  }


  private findLineupsIfTakeAndPass = (currentPoolIndex: number, currentLineup: FantasyLineup): LineupsIfTakeAndPass => {
    const currentPlayer = this.playerPool[currentPoolIndex]
    const luWithCurrentPlayer = currentLineup.add(currentPlayer)

    const lineupIfPass = this.traverseTakeOrNotTakeTree(currentPoolIndex + 1, currentLineup)
    const lineupIfTake = isValidLineup(luWithCurrentPlayer)
      ? this.traverseTakeOrNotTakeTree(currentPoolIndex + 1, luWithCurrentPlayer as FantasyLineup)
      : luWithCurrentPlayer

    return {lineupIfTake, lineupIfPass}
  }
}
