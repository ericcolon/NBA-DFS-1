import {Memoizer} from './Memoizer'
import {FantasyLineup} from '../lib/FantasyLineup'
import {InvalidLineup} from '../lib/FantasyLineup'
import {Player} from '../lib/Player'
import {IsValidFunction} from './IsValidFunction'

interface LineupsIfTakeAndPass {
  lineupIfTake: FantasyLineup | InvalidLineup
  lineupIfPass: FantasyLineup | InvalidLineup
}

const isValidLineup = (lineup: FantasyLineup|InvalidLineup) => {
  return !Object.keys(InvalidLineup).some(invalidLineup => lineup === invalidLineup)
}

export class SingleLineupOptimizer {
  static validateLineup = (lineup: FantasyLineup|InvalidLineup): FantasyLineup => {
    if (!isValidLineup(lineup)) throw new Error('invalid lineup!')
    return lineup as FantasyLineup
  }

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
    const PLAYERS_LEFT: number = this.playerPool.length - currentPoolIndex
    const SALARY_LEFT: number = this.salaryCap - currentLineup.salary
    const ROSTER_SPOTS_LEFT: number = this.rosterSpots - currentLineup.roster.length
    const IS_MEMOIZED: boolean = this.memoizer.isMemoized(PLAYERS_LEFT, SALARY_LEFT, ROSTER_SPOTS_LEFT)
    const IS_COMPLETE: boolean = currentLineup.isComplete

    if (IS_COMPLETE) {
      return this.isValid(currentLineup)
        ? currentLineup
        : InvalidLineup.FAILED_IS_VALID
    }

    if (IS_MEMOIZED) {
      const memoizedLineup = this.memoizer.getLineup(PLAYERS_LEFT, SALARY_LEFT, ROSTER_SPOTS_LEFT)
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

