import { Season, Period, NbaApiEndpoint, START_RANGE, END_RANGE, RANGE_TYPE } from "./params";
import { nbaApi } from "./nbaApi";
import { buildGameId } from "./buildGameId";

export interface BoxScoreResponse {}

export function getBoxScore(
  gameNumber: number,
  boxScoreType =  NbaApiEndpoint.BOX_SCORE_TRADITIONAL,
  seasonYear = Season.S2019,
  startPeriod = Period.ALL_QUARTERS,
  endPeriod = Period.ALL_QUARTERS,
): BoxScoreResponse {

  return nbaApi(boxScoreType, {
    gameId: buildGameId(seasonYear, gameNumber),
    startPeriod,
    endPeriod,
    startRange: START_RANGE,
    endRange: END_RANGE,
    rangeType: RANGE_TYPE
  })
}
