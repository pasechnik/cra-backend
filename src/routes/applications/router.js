import * as applications from './controller'
import * as auth from '../auth/controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/applications'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      auth.ensureUser(),
      applications.getApplications(),
      cutResults('applications'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      auth.ensureUser(['admin']),
      applications.createApplication(),
      cutResults('application'),
    ],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [
      auth.ensureUser(['admin']),
      applications.clearData(),
      cutResults('applications'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      auth.ensureUser(),
      applications.getApplication(),
      cutResults('application'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      auth.ensureUser(['admin']),
      applications.getApplication(),
      applications.patchApplication(),
      cutResults('application'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      auth.ensureUser(['admin']),
      applications.getApplication(),
      applications.updateApplication(),
      cutResults('application'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      auth.ensureUser(['admin']),
      applications.getApplication(),
      applications.deleteApplication(),
      // cutResults('application'),
    ],
  },
]

export default { baseUrl, routes }
