import { ensureUser } from '../../middleware/validators'
import * as cache from './controller'

export const baseUrl = '/v1/cache'

export const routes = [
  {
    method: 'GET',
    route: '/start',
    handlers: [
      // ensureUser,
      cache.initCache,
    ],
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      // ensureUser,
      cache.getCache,
    ],
  },
  {
    method: 'GET',
    route: '/servers',
    handlers: [
      // ensureUser,
      cache.getCachedServers,
    ],
  },
  // {
  //   method: 'GET',
  //   route: '/:id',
  //   handlers: [
  //     ensureUser,
  //     user.getUser,
  //   ]
  // },
  // {
  //   method: 'PUT',
  //   route: '/:id',
  //   handlers: [
  //     ensureUser,
  //     user.getUser,
  //     user.updateUser,
  //   ],
  // },
  // {
  //   method: 'DELETE',
  //   route: '/:id',
  //   handlers: [
  //     ensureUser,
  //     user.getUser,
  //     user.deleteUser,
  //   ],
  // },
  // {
  //   method: 'POST',
  //   route: '/search',
  //   handlers: [
  //     ensureUser,
  //     user.searchUsers,
  //   ],
  // },
]

export default { baseUrl, routes }
