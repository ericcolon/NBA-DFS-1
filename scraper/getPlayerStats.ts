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
import { PlayerExperience } from './params/PlayerExperience';
import { PlayerPosition } from './params/PlayerPosition';
import { StarterBench } from './params/StarterBench';
import { Conference } from './params/Conference';
import { Division } from './params/Division';

export interface PlayerStatsResults {}

export function getPlayerStats(
  playerExperience: PlayerExperience,
  playerPosition: PlayerPosition,
  starterBench: StarterBench,
  vsConference: Conference,
  vsDivision: Division,
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
  gameScope = '',
): PlayerStatsResults {

  return nbaApi(NbaApiEndpoint.PLAYER_STATS, {
    playerExperience,
    playerPosition,
    starterBench,
    vsConference,
    vsDivision,
    gameScope,
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
