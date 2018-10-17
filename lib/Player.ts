import { Team } from '../scraper/params/Team'

export enum FantasyStat {
  projection = 'projection',
  salary = 'salary',
}

export interface Player {
  name: string
  salary: number
  projection: number
  team: Team
}
