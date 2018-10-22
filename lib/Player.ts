import { Team } from '../scraper/params/Team'

export enum FantasyStat {
  projection = 'projection',
  salary = 'salary',
}

export interface IPlayer {
  name: string
  salary: number
  projection: number
  team: Team
}

export class Player implements IPlayer {
  private _player: IPlayer

  get name() {
    return this._player.name
  }

  get salary() {
    return this._player.salary
  }

  get projection() {
    return this._player.projection
  }

  get team() {
    return this._player.team
  }

  constructor(_player: IPlayer) {
    this._player = _player
  }
}