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
