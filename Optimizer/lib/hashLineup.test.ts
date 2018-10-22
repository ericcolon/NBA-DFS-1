import { hashLineup, hashString } from './hashLineup'
import { IPlayer} from '../../lib/Player'
import { FantasyLineup } from '../../lib/FantasyLineup'
import { randomPlayerPool } from './randomPlayerPool'


type RosterIndexes = [number, number, number, number, number]

function testIt(roster1Indexes: RosterIndexes, roster2Indexes: RosterIndexes, shouldEqual: boolean) {
  const SALARY_CAP = 50
  const ROSTER_SPOTS = 5

  const playerPool: IPlayer[] = randomPlayerPool(60)

  const roster1: IPlayer[] = roster1Indexes.map(i => ({...playerPool[i]}))
  const roster2: IPlayer[] = roster2Indexes.map(i => ({...playerPool[i]}))

  const lu1 = new FantasyLineup(SALARY_CAP, ROSTER_SPOTS, roster1)
  const lu2 = new FantasyLineup(SALARY_CAP, ROSTER_SPOTS, roster2)

  expect(
    hashLineup(playerPool, lu1) === hashLineup(playerPool, lu2)
  ).toBe(
    shouldEqual
  )
}

describe('hashLineup', () => {
  test('hashString should hash a string', () => {
    const str = 'I am a string'
    expect(typeof hashString(str)).toBe('string')

    expect(
      hashString(str) === str
    ).toBe(false)
  })

  test('should hash lineups with same players to same string value', () => {
    testIt(
      [0, 1, 2, 3, 4],
      [4, 3, 2, 1, 0],
      true
    )
  })

  test('should hash different lineups to different string values', () => {
    testIt(
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 5],
      false,
    )
  })
})
