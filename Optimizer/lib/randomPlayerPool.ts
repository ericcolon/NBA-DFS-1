import { randomInt } from './randomInt'
import { IPlayer } from '../../lib/Player'
import { Team } from '../../scraper/params/Team'


export function randomPlayerPool (n: number): IPlayer[] {
  const out: IPlayer[] = []

  for (let i = 0; i < n; i++) {
    const name = `player${i}`
    const salary = randomInt(1, 51)
    const projection = randomInt(-3, 3) + (salary * 5)
    const team = [Team.ATLANTA_HAWKS, Team.BOSTON_CELTICS, Team.BROOKLYN_NETS, Team.CLEVELAND_CAVALIERS][i % 4]

    out.push({
      name,
      salary,
      projection,
      team,
    })
  }

  return out
}
