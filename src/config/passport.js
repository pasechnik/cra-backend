import debug from 'debug'
import passport from 'koa-passport'
import { Strategy } from 'passport-local'
import { getEngine } from '../routes/users/module'

const error = debug('app:applications:controller:error')
const log = debug('app:applications:controller')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  const e = getEngine()
  // User.getUserById(id, function (err, user) { done(err, user) })
  e.get(id, false)
    .then(user => (user !== false ? done(null, user) : done('can`t find user', null)))
    .catch(() => done('error searching for user id', null))
})

passport.use(new Strategy(
  (username, password, done) => {
    const e = getEngine()
    e.getAll()
      .then(users => users.find(u => u.username === username))
      .then((user) => {
        if (user === undefined) {
          return done(null, false, { message: 'Incorrect username or password' })
        }
        if (user.password === password) {
          return done(null, user)
        }
        return done(null, false, { message: 'Incorrect username or password' })
      })
      .catch(() => done('error searching user and password', null))
  }
))


export default passport
