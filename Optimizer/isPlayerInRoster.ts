import { Player } from "../lib/Player";

export const isPlayerInRoster = (player: Player, roster: Player[]): boolean => {
  return roster.some(rosteredPlayer =>
    rosteredPlayer.name === player.name &&
    rosteredPlayer.team === player.team
  )
}