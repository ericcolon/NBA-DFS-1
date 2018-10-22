export function randomInt(lbound: number, ubound: number): number {
  const range = ubound - lbound
  return Math.floor(Math.random() * range) + lbound
}
