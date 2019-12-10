import debug from 'debug'
import logger from 'koa-logger'
import convert from 'koa-convert'
import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import app from './server'
import config from '../config'

const error = debug('app:server:error')
const log = debug('app:server')

app.use(convert(logger()))

const options = {
  key: fs.readFileSync(path.resolve(process.cwd(), 'keys/localhost.key')),
  cert: fs.readFileSync(path.resolve(process.cwd(), 'keys/localhost.crt')),
}

https.createServer(options, app.callback()).listen(config.secureport, () => {
  log(`start listening on ${config.secureport} in ssl mode `)
})

http.createServer(app.callback()).listen(config.port, () => {
  log(`start listening on ${config.port}`)
})

// app.server = app.listen(config.port, () => {
//   log(`start listening on ${config.port}`)
// })
