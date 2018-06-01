import * as users from './controller'
import { cutResults } from '../common/controller'
import { ensureUser } from '../../middleware/validators'

export const baseUrl = '/v1/users'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      users.checkTable(),
      users.addFirstUser(),
      ensureUser,
      users.getUsers(),
      cutResults('users'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      users.checkTable(),
      users.addFirstUser(),
      ensureUser,
      users.createUser(),
      cutResults('user'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      users.checkTable(),
      users.addFirstUser(),
      ensureUser,
      users.getUser(),
      cutResults('user'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      users.checkTable(),
      users.addFirstUser(),
      ensureUser,
      // users.getUser(),
      users.updateUser(),
      cutResults('user'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      users.checkTable(),
      users.addFirstUser(),
      ensureUser,
      users.getUser(),
      users.patchUser(),
      cutResults('user'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      users.checkTable(),
      users.addFirstUser(),
      ensureUser,
      users.getUser(),
      users.deleteUser(),
      cutResults('user'),
    ],
  },

]

export default { baseUrl, routes }
