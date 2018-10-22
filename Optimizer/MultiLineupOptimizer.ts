import {FantasyLineup} from '../lib/FantasyLineup'
import {IPlayer} from '../lib/Player'
import {IsValidFunction} from './lib/IsValidFunction'
import {SingleLineupOptimizer} from './SingleLineupOptimizer'
import { log } from '../lib/log'
import { OnNewLineupHandler } from './lib/OnNewLineupHandler'
import { hashLineup } from './lib/hashLineup'
import { validateLineup } from './lib/validateLineup'

export class MultiLineupOptimizer {
  private playerPool: IPlayer[]
  private salaryCap: number
  private rosterSpots: number
  private isValid: IsValidFunction
  private isRunning: boolean = false
  private lineupHashes = new Set<string>()
  private optimizer:  SingleLineupOptimizer
  private onNewLineupHandlers: {[handlerId: string]: OnNewLineupHandler} = {}

  private optimals: FantasyLineup[] = []

  constructor(
    playerPool: IPlayer[],
    salaryCap: number,
    rosterSpots: number,
    isValid: IsValidFunction = () => true,
  ) {
    this.playerPool = playerPool
    this.salaryCap = salaryCap
    this.rosterSpots = rosterSpots
    this.isValid = isValid

    this.optimizer = new SingleLineupOptimizer(
      this.playerPool,
      this.salaryCap,
      this.rosterSpots,
      this.isUniqueAndValid,
    )
  }

  public getOptimals = (/*maybe something like sortby*/): FantasyLineup[] => {
    return this.optimals
  }

  public subscribe = (onNewLineup: OnNewLineupHandler): string => {
    const handlerId = String(Math.random())
    this.onNewLineupHandlers[handlerId] = onNewLineup
    return handlerId
  }

  public unsubscribe = (handlerId: string): void => {
    delete this.onNewLineupHandlers[handlerId]
  }

  public start = async (n: number): Promise<FantasyLineup[]> => {
    if (this.isRunning) throw new Error('cannot start twice')
    return await this.findOptimals(n)
  }

  public stop = (): void => {
    if (!this.isRunning) log.warn('Lineup optimizer is already stopped')
    this.isRunning = false
  }

  private findOptimals = async (n: number): Promise<FantasyLineup[]> => {
    try {
      this.findNextLineup()
      this.emitNewLineup() // don't await
    } catch (e) {
      this.logError(e)
      this.isRunning = false
    }

    if (this.optimals.length === n) this.isRunning = false

    if (!this.isRunning) return this.optimals

    return this.findOptimals(n)
  }

  private emitNewLineup = async (): Promise<void> => {
    const handlers = Object.values(this.onNewLineupHandlers)
    await Promise.all(handlers.map(async handler => handler(this.optimals))).catch(log.error)
  }

  private findNextLineup = () => {
    const nextOptimal = this.optimizer.findOptimal()
    this.optimals.push(validateLineup(nextOptimal))
  }

  private isUniqueAndValid: IsValidFunction = (lineup: FantasyLineup) => {
    return this.isValid(lineup) && this.isUnique(lineup)
  }

  private isUnique: IsValidFunction = (lineup: FantasyLineup): boolean => {
    const hash = hashLineup(this.playerPool, lineup)
    return !this.lineupHashes.has(hash)
  }

  private logError = (e: Error) => {
    log.error('Unable to find lineups', {
      e,
      lineupsFound: this.optimals.length,
      playerPool: this.playerPool,
      salaryCap: this.salaryCap,
      rosterSpots: this.rosterSpots,
      optimals: this.optimals,
    })
  }
}
