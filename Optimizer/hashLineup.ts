import { isPlayerInRoster } from './isPlayerInRoster'
import { Player } from '../lib/Player'
import { FantasyLineup } from '../lib/FantasyLineup'

export const hashLineup = (playerPool: Player[], {roster}: FantasyLineup) => {
  return playerPool
    .map((poolPlayer) => isPlayerInRoster(poolPlayer, roster))
    .map(Number)
    .map(String)
    .join('')
}
