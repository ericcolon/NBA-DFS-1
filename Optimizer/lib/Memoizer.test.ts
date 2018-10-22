import { Memoizer } from './Memoizer'
import { randomPlayerPool } from './randomPlayerPool'
import { FantasyLineup } from '../../lib/FantasyLineup'


describe('Memoizer', () => {
  const SALARY_CAP = 50
  const ROSTER_SPOTS = 5

  const FIFTY = 50
  const TWENTY = 20
  const TWO = 2

  let memoizer: Memoizer
  let lu: FantasyLineup
  const pool = randomPlayerPool(60)

  beforeEach(() => {
    memoizer = new Memoizer()

    const roster = [pool[0], pool[1], pool[2], pool[3], pool[9]]

    lu = new FantasyLineup(SALARY_CAP, ROSTER_SPOTS, roster)

    memoizer.memoize(FIFTY, TWENTY, TWO, lu)
  })

  test('memoized lineups should return true for isMemoized', () => {
    expect(
      memoizer.isMemoized(FIFTY, TWENTY, TWO)
    ).toBe(true)
  })

  test('not lineups should return false for isMemoized', () => {
    const args = [FIFTY, TWENTY, TWO]

    args.forEach((x, i) => {
      const newArgs = [...args] as [number, number, number]
      newArgs[i] = 1000

      expect(
        memoizer.isMemoized(...newArgs)
      ).toBe(false)
    })
  })

  test('should be able to get lineup after memoizing it', () => {
    const memoized = memoizer.getLineup(FIFTY, TWENTY, TWO)

    expect(memoized).toEqual(lu)
  })

  test('should throw an error if lineup doesn\'t exit when calling getLineup', () => {
    expect(() =>
      memoizer.getLineup(0, 0, 0)
    ).toThrow(`cannot getLineup with playersLeft salaryLeft and rosterSpotsLeft that aren't memoized`)
  })

  test('should be able to memoize a new lineup', () => {
    const roster = pool.slice(15, 20)

    const lu = new FantasyLineup(SALARY_CAP, ROSTER_SPOTS, roster)

    memoizer.memoize(1, 2, 3, lu)

    expect(
      memoizer.isMemoized(1, 2, 3)
    ).toBe(true)
  })
})
