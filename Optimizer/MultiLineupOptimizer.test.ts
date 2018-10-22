import { IsValidFunction } from "./lib/IsValidFunction";
import { FantasyLineup } from "../lib/FantasyLineup";
import { IPlayer } from "../lib/Player";
import { MultiLineupOptimizer } from "./MultiLineupOptimizer";
import * as Bluebird from 'bluebird'

global.Promise = Bluebird

interface TestData {
  playerPool: IPlayer[]
  salaryCap: number
  rosterSpots: number
  isValid: IsValidFunction
  optimalLineups: FantasyLineup[]
}

const testData: TestData[] = []

describe('MultiLineupOptimizler', () => {

  it('should find the optimal lineups', async () => {
    // @ts-ignore
    Promise.map(testData, async ({
      playerPool,
      salaryCap,
      rosterSpots,
      isValid,
      optimalLineups,
    }: TestData) => {
      const slo = new MultiLineupOptimizer(playerPool, salaryCap, rosterSpots, isValid)

      expect (
        await slo.start(optimalLineups.length)
      ).toEqual(optimalLineups)
    })
  })
})
