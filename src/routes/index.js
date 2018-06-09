import Router from 'koa-router'
import debug from 'debug'
import applications from './applications/router'
// import auth from './auth/router'
// import forms from './forms/router'
// import tests from './tsts/router'
// import users from './users/router'
import root from './root/router'
import settings from './settings/router'
import verification from './verification/router'

const error = debug('app:server:error')
const log = debug('app:server')

const injectRoute = (app, routeConfig) => {
  const { routes, baseUrl } = routeConfig
  const instance = new Router({ prefix: baseUrl })

  log(baseUrl)
  routes.forEach(({ method = '', route = '', handlers = [] }) => {
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
    root,
    applications,
    settings,
    verification,
    // auth, forms, tests, users,
  ]
    .forEach(r => injectRoute(app, r))
}

export default init
