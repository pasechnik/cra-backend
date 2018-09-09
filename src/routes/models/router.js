import * as models from './controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/models'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      models.checkTable(),
      models.getModels(),
      cutResults('models'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      models.checkTable(),
      models.createModel(),
      cutResults('model'),
    ],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [
      models.checkTable(),
      models.clearData(),
      cutResults('models'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      models.checkTable(),
      models.getModel(),
      cutResults('model'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      models.checkTable(),
      models.getModel(),
      models.patchModel(),
      cutResults('model'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      models.checkTable(),
      models.getModel(),
      models.updateModel(),
      cutResults('model'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      models.checkTable(),
      models.getModel(),
      models.deleteModel(),
      // cutResults('model'),
    ],
  },
]

export default { baseUrl, routes }
