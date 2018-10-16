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
