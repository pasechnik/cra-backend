import * as applications from './controller'
import * as common from '../common/controller'

export const baseUrl = ''

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      applications.checkTable(),
      applications.getApplications(),
      common.cutResults('applications'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      applications.checkTable(),
      applications.createApplication(),
      common.cutResults('application'),
    ],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [
      applications.checkTable(),
      applications.clearData(),
      common.cutResults('applications'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      applications.checkTable(),
      applications.getApplication(),
      common.cutResults('application'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      applications.checkTable(),
      applications.getApplication(),
      applications.patchApplication(),
      common.cutResults('application'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      applications.checkTable(),
      applications.getApplication(),
      applications.updateApplication(),
      common.cutResults('application'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      applications.checkTable(),
      applications.getApplication(),
      applications.deleteApplication(),
      // common.cutResults('application'),
    ],
  },
]

export default { baseUrl, routes }
