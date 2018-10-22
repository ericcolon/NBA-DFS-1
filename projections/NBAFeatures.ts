import { Dec, Int } from "./Number";


export interface Production {
  threesPerPos: number
  twosPerPos: number
  ftsPerPos: number
  tosPerPos: number
  blksPerPos: number
  stlsPerPos: number
  rbPerPos: number
  astPerPos: number
  ptsPerPos: number
}

export interface Projections {
  projectedMinutes: number
  projectedUsage: Dec
  projectedAR: Dec
  projectedOR: Dec
  projectedDR: Dec
  projectedPace: Dec
  projectedProduction: Production
}

export interface BasicFeatures {
  positions: [Dec, Dec, Dec, Dec, Dec]
  isHome: Boolean
  teamVegas: number
  oppVegas: number
  projectedPace: number
  lastGame: Production
  last3Games: Production // 2-3
  last5Games: Production // 4-5
  last10Games: Production // 6-10
  last20Games: Production // 11-20
  last40Games: Production // 21-40
  last80Games: Production  // 40-80
  opponentMultipliers: Production
}

export interface DFSFeatures {
  salary: Int
  projOwn: Dec
}

export interface CashGameFeatures {

}

export interface TournamentFeatures {
  projection: Projections
}
