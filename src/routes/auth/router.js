import * as auth from './controller'

export const baseUrl = '/v1/auth'

export const routes = [
  {
    method: 'POST',
    route: '/',
    handlers: [
      // test.getTest('test'),
      auth.authUser(),
    ],
  },
]

export default { routes, baseUrl }
