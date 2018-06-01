import debug from 'debug'
import passport from 'koa-passport'
import jwt, { verify } from 'jsonwebtoken'
import config from '../../config'
import { runOutput } from '../common/module'
import { getToken } from '../../utils/auth'

const error = debug('app:auth:controller:error')
const log = debug('app:auth:controller')
const routeKey = 'auth'
const routeKeys = `${routeKey}s`

export const promiseAuth = ctx => new Promise((resolve, reject) =>
  passport.authenticate('local', (user, err) => {
    if (err) {
      return reject(err)
    }
    if (user) {
      const response = user
      delete response.password
      return resolve(response)
    }
    return null
  })(ctx)
)

export const authUserInner = () => async (key, ctx) => {
  const user = await promiseAuth(ctx)
  const token = jwt.sign({ id: user.id }, config.token)
  return {
    token,
    [key]: user,
  }
}

export const ensureUserInner = () => async (key, ctx) => {
  const token = getToken(ctx)

  if (!token) {
    throw Error('Authorization is failed')
    // ctx.throw(401, 'Authorization is failed')
  }

  let decoded = null
  try {
    decoded = verify(token, config.token)
  } catch (err) {
    throw Error('Authorization is failed')
    // throw Error('Authorization is failed')
    // ctx.throw(401, 'Authorization is failed')
  }

  return {
    [key]: { id: 1, username: 'admin', password: 'foo' },
  }

  // ctx.state.user = await Client.findById(decoded.id, '-password')
  // if (!ctx.state.user) {
  //   ctx.throw(401)
  // }

  // return next()
}

export const authUser = () => runOutput('user', authUserInner())
export const ensureUser = () => runOutput('user', ensureUserInner())

// FIXME: can be removed
export const authUserBest = async (ctx, next) => {
  try {
    const user = await promiseAuth(ctx, next)
    log(user)
    const token = jwt.sign({ id: user.id }, config.token)
    ctx.body = {
      token,
      user,
    }
  } catch (err) {
    error('can\'t auth user')
    ctx.throw(401, err.message)
  }

  if (next) {
    return next()
  }

  return ctx
}
