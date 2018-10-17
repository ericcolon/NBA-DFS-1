import {FantasyLineup} from '../lib/FantasyLineup'
import {Player} from '../lib/Player'
import {IsValidFunction} from './IsValidFunction'
import {SingleLineupOptimizer} from './SingleLineupOptimizer'
import { log } from '../lib/log';

const isPlayerInRoster = (player: Player, roster: Player[]): boolean => {
  return roster.some(rosteredPlayer =>
    rosteredPlayer.name === player.name &&
    rosteredPlayer.team === player.team
  )
}

export const hashLineup = (playerPool: Player[], {roster}: FantasyLineup) => {
  return playerPool
    .map((poolPlayer) => isPlayerInRoster(poolPlayer, roster))
    .map(Number)
    .map(String)
    .join('')
}

const validateLineup = SingleLineupOptimizer.validateLineup

export type OnNewLineupHandler = (optimals: FantasyLineup[]) => void

export class MultiLineupOptimizer {
  private playerPool: Player[]
  private salaryCap: number
  private rosterSpots: number
  private isValid: IsValidFunction
  private isRunning: boolean = false
  private lineupHashes = new Set<string>()
  private optimizer:  SingleLineupOptimizer
  private onNewLineupHandlers: {[handlerId: string]: OnNewLineupHandler} = {}

  private optimals: FantasyLineup[] = []

  constructor(playerPool: Player[], salaryCap: number, rosterSpots: number, isValid: IsValidFunction = () => true, onNewLineup: (lineup: FantasyLineup[]) => any) {
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
    const id = String(Math.random())
    this.onNewLineupHandlers[id] = onNewLineup
    return id
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
      this.emitNewLineup().catch(log.error)
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
      handlers.forEach(handler => handler(this.optimals))
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

