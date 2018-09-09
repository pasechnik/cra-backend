import debug from 'debug'
import passport from 'koa-passport'
import jwt, { verify } from 'jsonwebtoken'
import config from '../../config'
import { runOutput } from '../../modules/context'
import { getToken } from '../../utils/auth'
import { getEngine } from '../users/module'
import { output } from '../../models/user'

const error = debug('app:auth:controller:error')
const log = debug('app:auth:controller')
const routeKey = 'auth'
const routeKeys = `${routeKey}s`

export const promiseAuth = ctx => new Promise((resolve, reject) => passport.authenticate('local', (err, user, info) => {
  if (info) {
    return reject(info)
  }
  if (user) {
    const response = user
    delete response.password
    return resolve(response)
  }
  return null
})(ctx))

export const authUserInner = () => async (key, ctx) => {
  const user = await promiseAuth(ctx)
  const token = jwt.sign({ id: user.id }, config.token)
  return {
    token,
    [key]: user,
  }
}

export const ensureUserInner = role => async (key, ctx) => {
  const token = getToken(ctx)

  // log({ token })

  if (!token) {
    throw Error('Authorization failed. Token is not found')
    // ctx.throw(401, 'Authorization failed')
  }

  let decoded = null
  let user = { id: 0, username: 'none', role: 'none' }

  try {
    decoded = verify(token, config.token)
    // log({ decoded })

    const e = getEngine()
    user = await e.getAll()
      .then(users => users.find(u => u.id === decoded.id))

    // log({ user })
    // const
  } catch (err) {
    throw Error(`Authorization failed. ${err.message}`)
    // ctx.throw(401, 'Authorization is failed')
  }

  if (user === undefined) {
    throw Error('Authorization failed. User is not found')
  }

  if (role !== undefined) {
    if (Array.isArray(role)) {
      if (role.find(t => t === user.role) === undefined) {
        throw Error('Authorization failed. You do not have sufficient permissions to perform this action')
      }
    } else if (user.role !== role) {
      throw Error('Authorization failed. You do not have sufficient permissions to perform this action')
    }
  }

  return {
    [key]: output(user),
  }

// ctx.state.user = await Client.findById(decoded.id, '-password')
// if (!ctx.state.user) {
//   ctx.throw(401)
// }

// return next()
}

export const authUser = () => runOutput('user', authUserInner())
export const ensureUser = role => runOutput('user', ensureUserInner(role))
