import { Int, validateInt, validateDecPercent } from "./Number";

describe('Number', () => {
  describe('validateInt', () => {
    test('should return number of type Int if BigNumber is an Int', () => {
      const TWO: Int  = validateInt(2)
      expect(TWO).toEqual(2)
    })

    test('should throw if number is not of type Int', () => {
      expect(() => validateInt(1.5)).toThrow('Not an integer')
    })
  })

  describe('validateDecPercent', () => {
    test('should return Number of type DecPercent if Number is an percentage between 0 and 1', () => {
      const FIFTY_PERCENT = validateDecPercent(.5)
      const HUNDRED_PERCENT = validateDecPercent(1)
      const ZERO_PERCENT = validateDecPercent(0)

      expect(FIFTY_PERCENT).toEqual(.5)
      expect(HUNDRED_PERCENT).toEqual(1)
      expect(ZERO_PERCENT).toEqual(0)
    })

    test('should throw if number is not of type decPercent', () => {
      expect(() => validateDecPercent(2)).toThrow('Not a decimal percent')
    })
  })

})
