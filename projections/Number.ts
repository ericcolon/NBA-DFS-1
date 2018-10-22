export type Int = number
export type Dec = number

export function validateInt(n: number): Int {
  if (!Number.isInteger(n)) throw new Error('Not an integer')
  return n as Int
}

export function validateDecPercent(n: number): Dec{
  if (n < 0 || n > 1) throw new Error('Not a decimal percent')
  return n as Dec
}
