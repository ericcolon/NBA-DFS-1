import { randomInt } from './randomInt'


describe('randomInt', () => {
  const LBOUND = 0
  const UBOUND = 10

  function testIt(n: number, shouldBeInRange: boolean): void {
    const attempts = 1000

    let isInRange = false

    for (let i = 0; i < attempts; i++) {
      const rand = randomInt(LBOUND, UBOUND)

      const isInt = Number.isInteger(rand)
      const isRandInRange = rand >= LBOUND && rand <= UBOUND

      expect(isInt && isRandInRange).toBe(true)

      if (rand === n) isInRange = true
    }

    expect(isInRange).toBe(shouldBeInRange)
  }

  test('lower bound should be inclusive', () => {
    testIt(LBOUND, true)
  })


  test('upper bound should be exclusive', () => {
    testIt(UBOUND, false)
  })

  test('should return number sometimes if it is in the range', () => {
    testIt(4, true)
  })

  test('should never return a value if it is not in the range', () => {
    testIt(9999, false)
  })
})