import { FantasyLineup, InvalidLineup } from '../../lib/FantasyLineup'
import { isValidLineup } from './isValidLineup'

export function validateLineup(lineup: FantasyLineup|InvalidLineup): FantasyLineup {
  if (!isValidLineup(lineup)) throw new Error('invalid lineup!')
  return lineup as FantasyLineup
}