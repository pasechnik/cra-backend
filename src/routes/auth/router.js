import * as auth from './controller'
import * as users from '../users/controller'

export const baseUrl = '/v1/auth'

export const routes = [
  {
    method: 'POST',
    route: '/',
    handlers: [
      // test.getTest('test'),
      users.checkTable(),
      users.addFirstUser(),
      auth.authUser(),
    ],
  },
]

export default { routes, baseUrl }
