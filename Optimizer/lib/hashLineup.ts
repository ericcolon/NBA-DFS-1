import { isPlayerInRoster } from './isPlayerInRoster'
import { IPlayer } from '../../lib/Player'
import { FantasyLineup } from '../../lib/FantasyLineup'


export function hashLineup(playerPool: IPlayer[], {roster}: FantasyLineup) {
  return hashString(
    playerPool
      .map((poolPlayer) => isPlayerInRoster(poolPlayer, roster))
      .map(Number)
      .map(String)
      .join('')
  )
}

export function hashString(str: string): string {
  return str
    .split('')
    .map(c => c.charCodeAt(0))
    .reduce((hash: number, charCode: number) =>
      ((hash << 5) - hash) + charCode
    , 0)
    .toString()
}
