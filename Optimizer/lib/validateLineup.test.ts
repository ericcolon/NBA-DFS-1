import { InvalidLineup, FantasyLineup } from '../../lib/FantasyLineup'
import { validateLineup } from './validateLineup'


describe('validateLineup', () => {
  test('should throw if a lineup is invalid', () => {
    const invalidLineups = Object.values(InvalidLineup)
    invalidLineups.forEach(lu =>
      expect(() => validateLineup(lu)).toThrow('invalid lineup!')
    )
  })

  test('should not throw if a lineup is valid', () => {
    const validLineup = new FantasyLineup(50, 5, [])
    validateLineup(validLineup)
  })
})
