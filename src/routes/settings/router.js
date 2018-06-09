import * as settings from './controller'
import * as common from '../common/controller'

export const baseUrl = '/v1/settings'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      settings.checkTable(),
      settings.getSettings(),
      common.cutResults('settings'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      settings.checkTable(),
      settings.createSetting(),
      common.cutResults('settings'),
    ],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [
      settings.clearData(),
      // common.cutResults('clear'),
    ],
  },
  {
    method: 'GET',
    route: '/version',
    handlers: [
      settings.getVersion(),
      common.cutResults('settings'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      settings.getSetting(),
      common.cutResults('settings'),
    ],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      settings.getSetting(),
      settings.patchSetting(),
      common.cutResults('settings'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      settings.getSetting(),
      settings.updateSetting(),
      common.cutResults('settings'),
    ],
  },
  {
    method: 'DELETE',
    route: '/',
    handlers: [
      settings.checkTable(),
      settings.getSetting(),
      settings.deleteSetting(),
      // common.cutResults('settings'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      settings.getSetting(),
      settings.deleteSetting(),
      // common.cutResults('settings'),
    ],
  },
]

export default { baseUrl, routes }
