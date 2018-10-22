import { randomPlayerPool } from './randomPlayerPool'
import { isPlayerInRoster } from './isPlayerInRoster'
import { IPlayer } from '../../lib/Player'

describe('isPlayerInRoster', () => {
  const pool = randomPlayerPool(50)

  test('should return true if player is in roster', () => {
    const roster = pool.slice(0, 5)

    roster.forEach(plr => {
      expect(
        isPlayerInRoster(plr, roster)
      ).toBe(true)
    })
  })

  test('should return false if player is not in roster', () => {
    let roster: IPlayer[] = []

    expect(
      isPlayerInRoster(pool[0], roster)
    ).toBe(false)

    roster = pool.slice(0, 5)

    expect(
      isPlayerInRoster(pool[10], roster)
    ).toBe(false)
  })
})
