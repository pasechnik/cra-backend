import * as test from './controller'
import { ensureUser } from '../auth/controller'

export const baseUrl = '/v1/tests'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      ensureUser(['user', 'admin']),
      // ensureUser('user'),
      // ensureUser('admin'),
      // ensureUser(),
      test.getTest('test'),
      test.getTests('tests'),
      // cutResults('tests'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      test.getTests('tests'),
      test.getTest('test'),
      // cutResults('test'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      test.getTest('test'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      test.getTest('test'),
      // test.getApplication,
      // test.patchApplication,
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      test.delTest('test'),
      // test.getApplication,
      // test.deleteApplication,
    ],
  },
]

export default { baseUrl, routes }
