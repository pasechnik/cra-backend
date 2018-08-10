import * as medias from './controller'
import * as common from '../common/controller'

export const baseUrl = '/v1/medias'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      medias.checkTable(),
      medias.getApplications(),
      common.cutResults('medias'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      medias.checkTable(),
      medias.createApplication(),
      common.cutResults('media'),
    ],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [
      medias.checkTable(),
      medias.clearData(),
      common.cutResults('medias'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      medias.checkTable(),
      medias.getApplication(),
      common.cutResults('media'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      medias.checkTable(),
      medias.getApplication(),
      medias.patchApplication(),
      common.cutResults('media'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      medias.checkTable(),
      medias.getApplication(),
      medias.updateApplication(),
      common.cutResults('media'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      medias.checkTable(),
      medias.getApplication(),
      medias.deleteApplication(),
      common.cutResults('media'),
    ],
  },
]

export default { baseUrl, routes }
