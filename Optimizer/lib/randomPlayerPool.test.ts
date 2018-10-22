import { randomPlayerPool } from './randomPlayerPool'
import { IPlayer } from '../../lib/Player'


describe('randomPlayerPool', () => {
  test('should return a random pool of n unique players', () => {
    const pool = randomPlayerPool(30)

    function isPlayer(player: any) {
      try {
        return !!player.name && !!player.projection && !!player.salary && !!player.team
      } catch(e) {
        return false
      }
    }

    function mapToPlayerName(player: IPlayer): string {
      expect(isPlayer(player)).toBe(true)
      return player.name
    }


    expect(new Set(
        pool.map(mapToPlayerName)
    ).size).toBe(30)
  })
})
