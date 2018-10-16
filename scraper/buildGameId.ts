import { Season } from './params/Season'

export function buildGameId(season: Season, game: number): string {
  let gameStr = `${game}`
  while (gameStr.length < 5) {
    gameStr = '0' + gameStr
  }
  return `002${season}${gameStr}`
}
