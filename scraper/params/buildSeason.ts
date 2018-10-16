import { Season } from './Season'

export function buildSeason(season: Season): string {
  const seasonNum = Number(season)
  return `${20}${seasonNum - 1}-${seasonNum}`
}
