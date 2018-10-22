import { FantasyLineup, InvalidLineup } from '../../lib/FantasyLineup'

export const isValidLineup = (lineup: FantasyLineup|InvalidLineup) => {
  return !Object.values(InvalidLineup).some(invalidLineup => lineup === invalidLineup)
}
