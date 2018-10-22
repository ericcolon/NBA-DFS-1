import { IPlayer } from '../../lib/Player'


export const isPlayerInRoster = (player: IPlayer, roster: IPlayer[]): boolean => {
  return roster.some(rosteredPlayer =>
    rosteredPlayer.name === player.name &&
    rosteredPlayer.team === player.team
  )
}
