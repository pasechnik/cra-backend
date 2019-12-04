import * as settings from './controller'
import * as application from '../applications/controller'
import * as auth from '../auth/controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/settings'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [settings.checkTable(), auth.ensureUser(), settings.getSettings(), cutResults('settings')],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [settings.checkTable(), auth.ensureUser(['admin']), settings.createSetting(), cutResults('settings')],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [
      application.checkTable(),
      settings.checkTable(),
      auth.ensureUser(['admin']),
      application.clearData(),
      settings.clearData(),
      // cutResults('clear'),
    ],
  },
  {
    method: 'GET',
    route: '/version',
    handlers: [auth.ensureUser(), settings.getVersion(), cutResults('settings')],
  },
  {
    method: 'GET',
    route: '/dashboard',
    handlers: [auth.ensureUser(), settings.getDashboard(), cutResults('dashboard')],
  },
  {
    method: 'POST',
    route: '/offline',
    handlers: [settings.importOffline(), cutResults('settings')],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [settings.checkTable(), auth.ensureUser(), settings.getSetting(), cutResults('settings')],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      auth.ensureUser(['admin']),
      settings.getSetting(),
      settings.patchSetting(),
      cutResults('settings'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      auth.ensureUser(['admin']),
      settings.getSetting(),
      settings.updateSetting(),
      cutResults('settings'),
    ],
  },
  {
    method: 'DELETE',
    route: '/',
    handlers: [
      settings.checkTable(),
      auth.ensureUser(['admin']),
      settings.getSetting(),
      settings.deleteSetting(),
      // cutResults('settings'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      settings.checkTable(),
      auth.ensureUser(['admin']),
      settings.getSetting(),
      settings.deleteSetting(),
      // cutResults('settings'),
    ],
  },
]

export default { baseUrl, routes }
