import debug from 'debug'
import { calcprice, delta } from '../src/calcprice'

const error = debug('app:funcs:calcprice:error')
const log = debug('app:funcs:calcprice')

describe('functions: -> calcprice:Delta', () => {
  test('delta min low', async () => {
    const result = delta(0, 'min')
    expect(result).toBe(0)
  })
  test('delta min high', async () => {
    const result = delta(1, 'min')
    expect(result).toBe(0.0006)
  })
  test('delta max low', async () => {
    const result = delta(0, 'max')
    expect(result).toBe(0.0011)
  })
  test('delta max high', async () => {
    const result = delta(1, 'max')
    expect(result).toBe(0.0012)
  })
})

describe('functions: -> calcprice:Calc min', () => {
  test('price low', async () => {
    const result = calcprice(10000, delta(0, 'min'), 2)
    expect(result).toBe(9990)
  })
  test('price high ', async () => {
    const result = calcprice(10000, delta(1, 'min'), 2)
    expect(result).toBe(9996)
  })
  test('price middle', async () => {
    const result = calcprice(10000, delta(0.5, 'min'), 2)
    expect(result).toBe(9993)
  })
})

describe('functions: -> calcprice:Calc max', () => {
  test('price low', async () => {
    const result = calcprice(10000, delta(0, 'max'), 2)
    expect(result).toBe(10001)
  })
  test('price high ', async () => {
    const result = calcprice(10000, delta(1, 'max'), 2)
    expect(result).toBe(10002)
  })
  test('price middle', async () => {
    const result = calcprice(10000, delta(0.5, 'max'), 2)
    expect(result).toBe(10001.5)
  })
})
