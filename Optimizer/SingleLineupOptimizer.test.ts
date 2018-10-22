import { IsValidFunction } from "./lib/IsValidFunction";
import { FantasyLineup } from "../lib/FantasyLineup";
import { IPlayer } from "../lib/Player";
import { SingleLineupOptimizer } from "./SingleLineupOptimizer";

interface TestData {
  playerPool: IPlayer[]
  salaryCap: number
  rosterSpots: number
  isValid: IsValidFunction
  optimalLineup: FantasyLineup
}

const testData: TestData[] = []

describe('SingleLineupOptoimizer', () => {
  it('should find the optimal lineup', () => {
    testData.forEach(({
      playerPool,
      salaryCap,
      rosterSpots,
      isValid,
      optimalLineup,
    }) => {
      const slo = new SingleLineupOptimizer(playerPool, salaryCap, rosterSpots, isValid)

      expect (
        slo.findOptimal()
      ).toEqual(optimalLineup)
    })
  })
})
