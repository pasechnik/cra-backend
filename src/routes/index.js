import Router from 'koa-router'
import debug from 'debug'
import auth from './auth/router'
import applications from './applications/router'
import mzc from './mzc/router'
import logs from './logs/router'
import models from './models/router'
import settings from './settings/router'
import tests from './tsts/router'
import users from './users/router'

const error = debug('app:server:error')
const log = debug('app:server')

const injectRoute = (app, routeConfig) => {
  const { routes, baseUrl } = routeConfig
  const instance = new Router({ prefix: baseUrl })

  log(baseUrl)
  routes.forEach((config) => {
    const {
      method = '',
      route = '',
      handlers = [],
    } = config

    const lastHandler = handlers.pop()

    if (lastHandler !== undefined) {
      instance[method.toLowerCase()](route, ...handlers, async ctx => lastHandler(ctx))
      app
        .use(instance.routes())
        .use(instance.allowedMethods())
    }
  })
}

export const init = (app) => {
  [
    auth,
    applications,
    logs,
    models,
    mzc,
    settings,
    tests,
    users,
  ]
    .forEach(r => injectRoute(app, r))
}

export default init
