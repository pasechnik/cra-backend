import * as users from './controller'
import * as auth from '../auth/controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/users'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [auth.ensureUser(), users.getUsers(), cutResults('users')],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [auth.ensureUser(['admin']), users.clearData(), cutResults('users')],
  },

  {
    method: 'POST',
    route: '/',
    handlers: [auth.ensureUser(), users.createUser(), cutResults('user')],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [auth.ensureUser(), users.getUser(), cutResults('user')],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      auth.ensureUser(),
      // users.getUser(),
      users.updateUser(),
      cutResults('user'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [auth.ensureUser(), users.getUser(), users.patchUser(), cutResults('user')],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [auth.ensureUser(), users.getUser(), users.deleteUser(), cutResults('user')],
  },
]

export default { baseUrl, routes }
