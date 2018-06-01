import Koa from 'koa'

import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors'
import customPassport from '../config/passport'
import config from '../config'
import { errorMiddleware } from '../middleware'

// import debug from 'debug'
// import io from 'socket.io'
// import mount from 'koa-mount'
// import serve from 'koa-static'
// import { Storage } from '../app/storage'
// import { Cache } from '../app/cache'
// import socketsStorage from '../sockets/storage'
// import socketsCache from '../sockets/cache'

const app = new Koa()

app.keys = [config.session]
app.use(convert(cors({ methods: 'GET,HEAD,PATCH,PUT,POST,DELETE' })))

if (config.env === 'development') {
  app.use(convert(logger()))
}
app.use(bodyParser())
app.use(errorMiddleware())

// app.use(convert(mount('/docs', serve('build/public/docs'))))

app.use(customPassport.initialize())
// app.use(customPassport.session())

const routes = require('../routes').default

routes(app)

// if (!module.parent) {
//   app.server = app.listen(config.port, () => {
//     log(`Server started on ${config.port}`)
//   })
// }

// const storage = new Storage(config.storage.name)
// const cache = new Cache(config.cache.name)
// const sockets = io.listen(app.server)
// storage.setIO(sockets)
// storage.setCache(cache)
//
// socketsStorage(sockets, storage)
// socketsCache(sockets, cache)
//
// cache.autostart()

export default app
