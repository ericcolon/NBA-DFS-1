import {Memoizer} from './Memoizer'
import {FantasyLineup} from '../lib/FantasyLineup'
import {InvalidLineup} from '../lib/FantasyLineup'
import {Player} from '../lib/Player'
import {IsValidFunction} from './IsValidFunction'
import { isValidLineup } from './isValidLineup'

interface LineupsIfTakeAndPass {
  lineupIfTake: FantasyLineup | InvalidLineup
  lineupIfPass: FantasyLineup | InvalidLineup
}

export class SingleLineupOptimizer {
  private playerPool: Player[]
  private salaryCap: number
  private rosterSpots: number
  private memoizer: Memoizer = new Memoizer()
  private isValid: IsValidFunction

  constructor(playerPool: Player[], salaryCap: number, rosterSpots: number, isValid: IsValidFunction = () => true) {
    this.playerPool = playerPool
    this.salaryCap = salaryCap
    this.rosterSpots = rosterSpots
    this.isValid = isValid
  }

  public findOptimal = (): FantasyLineup | InvalidLineup => {
    const optimal = this.traverseTakeOrNotTakeTree(0, new FantasyLineup(
      this.salaryCap,
      this.rosterSpots,
      [],
    ))

    if (!optimal) throw new Error('unable to find lineup')
    return optimal
  }

  private traverseTakeOrNotTakeTree = (currentPoolIndex: number, currentLineup: FantasyLineup): FantasyLineup | InvalidLineup => {
    if (currentLineup.isComplete) {
      return this.isValid(currentLineup)
        ? currentLineup
        : InvalidLineup.FAILED_IS_VALID
    }

    const playersLeft: number = this.playerPool.length - currentPoolIndex
    const salaryLeft: number = this.salaryCap - currentLineup.salary
    const rosterSpotsLeft: number = this.rosterSpots - currentLineup.roster.length

    const isMemoized: boolean = this.memoizer.isMemoized(playersLeft, salaryLeft, rosterSpotsLeft)

    if (isMemoized) {
      const memoizedLineup = this.memoizer.getLineup(playersLeft, salaryLeft, rosterSpotsLeft)
      return isValidLineup(memoizedLineup)
        ? currentLineup.combine(memoizedLineup)
        : memoizedLineup
    }

    const {lineupIfTake, lineupIfPass} = this.findLineupsIfTakeAndPass(currentPoolIndex, currentLineup)

    return this.bestLineup({lineupIfTake, lineupIfPass})
  }

  private bestLineup = ({lineupIfTake, lineupIfPass}: LineupsIfTakeAndPass): FantasyLineup | InvalidLineup => {
    if (!isValidLineup(lineupIfPass)) return lineupIfTake
    if (!isValidLineup(lineupIfTake)) return lineupIfPass

    return (lineupIfTake as FantasyLineup).projection > (lineupIfPass as FantasyLineup).projection
      ? lineupIfTake
      : lineupIfPass
  }


  private findLineupsIfTakeAndPass = (currentPoolIndex: number, currentLineup: FantasyLineup): LineupsIfTakeAndPass => {
    const currentPlayer: Player = this.playerPool[currentPoolIndex]
    const luWithCurrentPlayer: FantasyLineup | InvalidLineup = currentLineup.add(currentPlayer)

    const lineupIfPass: FantasyLineup | InvalidLineup = this.traverseTakeOrNotTakeTree(currentPoolIndex + 1, currentLineup)
    const lineupIfTake: FantasyLineup | InvalidLineup = isValidLineup(luWithCurrentPlayer)
      ? this.traverseTakeOrNotTakeTree(currentPoolIndex + 1, luWithCurrentPlayer as FantasyLineup)
      : luWithCurrentPlayer

    return {lineupIfTake, lineupIfPass}
  }
}

