import debug from 'debug'
import { verify } from 'jsonwebtoken'
import { getToken } from '../utils/auth'
import config from '../config'

const error = debug('app:getToken:error')
const log = debug('app:getToken')

export async function ensureUser(ctx, next) {
  const token = getToken(ctx)

  if (!token) {
    ctx.throw(401, 'Authorization is failed')
  }

  let decoded = null
  log({ decoded })
  try {
    decoded = verify(token, config.token)
  } catch (err) {
    ctx.throw(401, 'Authorization is failed')
  }

  // ctx.state.user = await Client.findById(decoded.id, '-pass
  // word')
  if (!ctx.state.user) {
    ctx.throw(401)
  }

  return next()
}

export default ensureUser
