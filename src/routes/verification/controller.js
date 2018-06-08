import { runOutput } from '../common/module'
import { mPhone, mCode } from './module'

const Root = (ctx, next) => {
  ctx.body = { endpoints: ['POST: ./phone', 'POST: ./code'] }
  return (next ? next() : ctx)
}
export const routeKey = 'verification'
export const routeKeys = 'verifications'

const Phone = runOutput(routeKey, mPhone())
const Code = runOutput(routeKey, mCode())

export default { Root, Phone, Code }
