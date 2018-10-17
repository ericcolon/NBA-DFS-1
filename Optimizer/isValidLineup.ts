import { FantasyLineup, InvalidLineup } from "../lib/FantasyLineup";

export const isValidLineup = (lineup: FantasyLineup|InvalidLineup) => {
  return !Object.keys(InvalidLineup).some(invalidLineup => lineup === invalidLineup)
}
