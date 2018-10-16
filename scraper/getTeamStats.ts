import { nbaApi } from './nbaApi'
import { Team } from './params/Team';
import { Season } from './params/Season';
import { MeasureType } from './params/MeasureType';
import { PerMode } from './params/PerMode';
import { YesNoEnum } from './params/YesNoEnum';
import { SeasonType } from './params/SeasonType';
import { Outcome } from './params/Outcome';
import { Month } from './params/Month';
import { Location } from './params/Location';
import { GameSegment } from './params/GameSegment';
import { NbaApiEndpoint } from './params/NbaApiEndpoint';

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
