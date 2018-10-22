import { InvalidLineup, FantasyLineup } from '../../lib/FantasyLineup'
import { isValidLineup } from './isValidLineup'
import { randomPlayerPool } from './randomPlayerPool'


describe('isValidLineup', () => {
  test('should return false for invalidLineups', () => {
    const invalidLineups = [
      InvalidLineup.FAILED_IS_VALID,
      InvalidLineup.OVER_SALARY,
      InvalidLineup.RAN_OUT_OF_PLAYERS,
      InvalidLineup.TOO_MANY_PLAYERS
    ]

    invalidLineups.forEach(lu =>
      expect(isValidLineup(lu)).toBe(false)
    )
  })

  test('should return true for a validLineup', () => {
    const pool = randomPlayerPool(10)

    const validLineups = [
      new FantasyLineup(50, 4, []),
      new FantasyLineup(50, 4, [pool[1]]),
      new FantasyLineup(50, 4, [pool[1], pool[2], pool[3], pool[4]]),
    ]

    validLineups.forEach(lu =>
      expect(isValidLineup(lu)).toBe(true)
    )
  })
})
