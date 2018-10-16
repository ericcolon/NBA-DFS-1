import { NBA_API_URL } from "./constants";
import { buildQueryString } from "./buildQueryString";

export enum NbaApiEndpoint {
  ALL_STAR_BALLOT_PREDICTOR = 'allstarballotpredictor',
  BOX_SCORE_ADVANCED = 'boxscoreadvancedv2',
  BOX_SCORE_FOUR_FACTORS = 'boxscorefourfactorsv2',
  BOX_SCORE_MISC = 'boxscoremiscv2',
  BOX_SCORE_PLAYER_TRACK = 'boxscoreplayertrackv2',
  BOX_SCORE_SCORING = 'boxscorescoringv2',
  BOX_SCORE_SUMMARY = 'boxscoresummaryv2',
  BOX_SCORE_TRADITIONAL = 'boxscoretraditionalv2',
  BOX_SCORE_USAGE = 'boxscoreusagev2',
  PLAY_BY_PLAY = 'playbyplayv2',
  TEAM_STATS = 'leaguedashteamstats',
}

export enum SeasonType {
  REGULAR_SEASON = 'Regular Season',
  PRESEASON = 'Pre Season',
  PLAYOFFS = 'Playoffs',
  ALL_STAR = 'All Star',
  ALL_STAR_FFS = 'All-Star',
  PRESEASON_FFS = 'Preseason',
  DEFAULT = 'Regular Season',
}

export enum Season {
  S2019 = '19',
  S2018 = '18',
  S2017 = '17',
  S2016 = '16',
  S2015 = '15',
  S2014 = '14',
  S2013 = '13',
  S2012 = '12',
  S2011 = '11',
  S2010 = '10',
  DEFAULT = '19',
}

export enum Team {
  ATLANTA_HAWKS = '1610612737',
  BOSTON_CELTICS = '1610612738',
  BROOKLYN_NETS ='1610612751',
  CHARLOTTE_HORNETS ='1610612766',
  CHICAGO_BULLS = '1610612741',
  CLEVELAND_CAVALIERS = '1610612739',
  DALLAS_MAVERICKS = '1610612742',
  DENVER_NUGGETS = '1610612743',
  DETROIT_PISTONS = '1610612765',
  GOLDEN_STATE_WARRIORS = '1610612744',
  HOUSTON_ROCKETS = '1610612745',
  INDIANA_PACERS ='1610612754',
  LOS_ANGELES_CLIPPERS = '1610612746',
  LOS_ANGELES_LAKERS = '1610612747',
  MEMPHIS_GRIZZLIES = '1610612763',
  MIAMI_HEAT = '1610612748',
  MILWAUKEE_BUCKS = '1610612749',
  MINNESOTA_TIMBERWOLVES = '1610612750',
  NEW_ORLEANS_HORNES = '1610612740',
  NEW_YORK_KNICKS = '1610612752',
  OKLAHOMA_CITY_THUNDER = '1610612760',
  ORLANDO_MAGIC = '1610612753',
  PHILADELPHIA_SIXERS = '1610612755',
  PHOENIX_SUNS = '1610612756',
  PORTLAND_TRAIL_BLAZERS = '1610612757',
  SACRAMENTO_KINGS = '1610612758',
  SAN_ANTONIO_SPURS = '1610612759',
  TORONTO_RAPTORS = '1610612761',
  UTAH_JAZZ = '1610612762',
  WASHINGTON_WIZARDS = '1610612764',
  DEFAULT = '0',
}

export enum LeagueID {
  NBA = '00',
  ABA = '01',
  DEFAULT = '00',
}

export function buildSeason(season: Season): string {
  const seasonNum = Number(season)
  return `${20}${seasonNum - 1}-${seasonNum}`
}

export enum PerMode {
  TOTALS = 'Totals',
  PER_GAME = 'PerGame',
  MINUTES_PER = 'MinutesPer',
  PER_48 = 'Per48',
  PER_40 = 'Per40',
  PER_36 = 'Per36',
  PER_MINUTE = 'PerMinute',
  PER_POSSESSION = 'PerPossession',
  PER_PLAY = 'PerPlay',
  PER_100_POSSESSIONS = 'Per100Possessions',
  PER_100_PLAYS = 'Per100Plays',
  DEFAULT = 'PerGame'
}

export enum MeasureType {
  BASE = 'Base',
  ADVANCED = 'Advanced',
  MISC = 'Misc',
  FOUR_FACTORS = 'Four Factors',
  SCORING = 'Scoring',
  OPPONENT = 'Opponent',
  USAGE = 'Usage',
  DEFAULT = 'Base',
}

export enum Scope {
  RS = 'RS',
  S = 'S',
  ROOKIES = 'Rookies',
  DEFAULT = 'RS',
}

export enum PtMeasureType {
  SPEED_DISTANCE = 'SpeedDistance',
  DEFAULT = 'SpeedDistance',
}

export enum GroupQuantity {
  DEFAULT = 5
}

export enum Outcome {
  WIN = 'W',
  LOSS = 'L',
  DEFAULT = '',
}

export enum Location {
  HOME = 'Home',
  AWAY = 'Away',
  DEFAULT = '',
}

export enum SeasonSegment {
  ENTIRE_SEASON = '',
  PRE_ALL_STAR = 'Pre All-Star',
  POST_ALL_STAR = 'Post All-Star',
  DEFAULT = '',
}

export enum Conference {
  ALL = '',
  EAST = 'East',
  WEST = 'West',
  DEFAULT = '',
}

export enum Division {
  ALL = '',
  ATLANTIC = 'Atlantic',
  CENTRAL = 'Central',
  NORTHWEST = 'Northwest',
  PACIFIC = 'Pacific',
  SOUTHEAST = 'Southeast',
  SOUTHWEST = 'Southwest',
  DEFAULT = '',
}

export enum GameSegment {
  ENTIRE_GAME = '',
  FIRST_HALF = 'First Half',
  SECOND_HALF = 'Second Half',
  OVERTIME = 'Overtime',
}

export enum ClutchTime {
  Last_FIVE_MINUTES = 'Last 5 Minutes',
  LAST_FOUR_MINUTES = 'Last 4 Minutes',
  LAST_THREE_MINUTES = 'Last 3 Minutes',
  LAST_TWO_MINUTES = 'Last 2 Minutes',
  LAST_MINUTE = 'Last 1 Minutes',
  LAST_THIRTY_SECONDS = 'Last 30 Seconds',
  LAST_TEN_SECONDS = 'Last 10 Seconds',
}

export class ShotClockRange {
  ALL_RANGES = ''
  SHOT_CLOCK_OFF = 'ShotClock Off'

  get(n: number) {
    if (n > 24 || n < 0) return ''
    if (n >= 22) return '24-22'
    if (n >= 18) return '22-18 Very Early'
    if (n >= 15) return '18-15 Early'
    if (n >= 7) return '15-7 Average'
    if (n >= 4) return '7-4 Late'
    if (n >= 0) return '4-0 Very Late'
  }
}

export enum AheadBehind {
  AHEAD_OR_BEHIND = 'Ahead or Behind',
  AHEAD_OR_TIED = 'Ahead or Tied',
  BEHIND_OR_TIED = 'Behind or Tied',
  DEFAULT = ''
}

export enum YesNoEnum {
  YES = 'Y',
  NO = 'N',
  DEFAULT = 'N',
}

export class Period {
  static ALL_QUARTERS = '0'
  static FIRST_QUARTER = '1'
  static SECOND_QUARTER = '2'
  static THIRD_QUARTER = '3'
  static FOURTH_QUARTER = '4'

  overtime(overtimes: number) {
    return `${4 + overtimes}`
  }
}

export type LastNGames = string

export enum PlayoffRound {
  ALL = '0',
  QUARTERFINALS = '1',
  SEMIFINALS = '2',
  CONFERENCEFINALS = '3',
  FINALS = '4',
}

export enum Month {
  All = '0',
  OCTOBER = '1',
  NOVEMBER = '2',
  DECEMBER = '3',
  JANUARY = '4',
  FEBRUARY = '5',
  MARCH = '6',
  APRIL = '7',
  MAY = '8',
  JUNE = '9',
  JULY = '10',
  AUGUST = '11',
  SEPTEMBER = '12',
  DEFAULT = '0',
}

export const RANGE_TYPE = '0'
export const START_RANGE = '0'
export const END_RANGE = '0'

export enum Direction {
  DESC = 'DESC',
  ASC = 'ASC',
  DEFAULT = 'DESC',
}

export enum PlayerPosition {
  FORWARD = 'F',
  CENTER = 'C',
  GUARD = 'G',
  DEFAULT = '',
}

export enum StarterBench {
  STARTERS = 'Starters',
  BENCH = 'Bench',
  DEFAULT = '',
}

export enum PlayerExperience {
  ROOKIE = 'Rookie',
  SOPHOMORE = 'Sophomore',
  VETERAN = 'Veteran',
}

export enum StatCategory {
  PTS = 'PTS',
  FGM = 'FGM',
  FGA = 'FGA',
  FG_PCT = 'FG%',
  FG3M = '3PM',
  FG3A = '3PA',
  FG3_PCT = '3P%',
  FTM = 'FTM',
  FTA = 'FTA',
  FT_PCT = 'FT%',
  OREB = 'OREB',
  DREB = 'DREB',
  REB = 'REB',
  AST = 'AST',
  STL = 'STL',
  BLK = 'BLK',
  TOV = 'TOV',
  EFF = 'EFF',
  AST_TOV = 'AST/TO',
  STL_TOV = 'STL/TOV',
  PF = 'PF',
  Default = PTS,
}

export type Params = {
  measureType?: MeasureType,
  shotClockRange?: ShotClockRange,
  period: Period,
  aheadBehind: AheadBehind,
  ClutchTime,
  Conference,
  Direction,
  Division,
  StarterBench,
  EndPoint,
  GameSegment,
  GroupQuantity,
  LeagueID,
  Location,
  Month,
  Outcome,
  SeasonType,
  SeasonSegment,
  Teams,
  PerMode,
  PlayerExperience,
  PlayerPosition,
  PlayoffRound,
  Season,
  PtMeasureType,
  Scope,
}

export function buildEndpoint(endpoint: EndPoint, params: Params) {
  return `${NBA_API_URL}/${endpoint}/${buildQueryString(params)}`
}