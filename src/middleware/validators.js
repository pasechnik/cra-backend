import { verify } from 'jsonwebtoken'
import getToken from '../utils/auth'
import config from '../config'

export async function ensureUser(ctx, next) {
  const token = getToken(ctx)

  if (!token) {
    ctx.throw(401, 'Authorization is failed')
  }

  try {
    verify(token, config.token)
    // const decoded = verify(token, config.token)
    // ctx.state.user = await Client.findById(decoded.id, '-password')
    // if (!ctx.state.user) {
    //   ctx.throw(401)
    // }
  } catch (err) {
    ctx.throw(401, 'Authorization is failed')
  }


  return next ? next() : ctx
}

export default ensureUser
