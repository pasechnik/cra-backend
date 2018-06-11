export const calcprice = (x, d, r = 4) => Math.round(x * (0.9990 + d) * (10 ** r)) / (10 ** r)

export const delta = (x, min = 'min') => (min === 'min' ? x * 0.0006 :
  Math.round((0.0011 + (x * 0.0001)) * (10 ** 6)) / (10 ** 6))

export default { calcprice, delta }
