import { Season, Period, NbaApiEndpoint, START_RANGE, END_RANGE, RANGE_TYPE, Team, MeasureType, PerMode, YesNoEnum, SeasonType, Outcome, Location, Month, GameSegment, ClutchTime } from "./params";
import { nbaApi } from "./nbaApi";
import { buildGameId } from "./buildGameId";

export interface BoxScoreResponse {}

export function getTeamStats(
  team: Team,
  season = Season.DEFAULT,
  measureType = MeasureType.DEFAULT,
  perMode = PerMode.DEFAULT,
  plusMinus = YesNoEnum.DEFAULT,
  paceAdjust = YesNoEnum.DEFAULT,
  rank = YesNoEnum.DEFAULT,
  seasonType = SeasonType.DEFAULT,
  outcome = Outcome.DEFAULT,
  location = Location.DEFAULT,
  month = Month.DEFAULT,
  dateFrom = '',
  dateTo = '',
  opposingTeam = Team.DEFAULT,
  gameSegment = GameSegment.ENTIRE_GAME,
  period = 0,
  lastNGames = 0,
): BoxScoreResponse {

  return nbaApi(NbaApiEndpoint.TEAM_STATS, {
    team,
    season,
    measureType,
    perMode,
    plusMinus,
    paceAdjust,
    rank,
    seasonType,
    outcome,
    location,
    month,
    dateFrom,
    dateTo,
    opposingTeam,
    gameSegment,
    period,
    lastNGames,
  })
}