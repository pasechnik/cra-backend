import * as logs from './controller'
import * as settings from '../settings/controller'
import * as auth from '../auth/controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/logs'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      logs.checkTable(),
      settings.checkTable(),
      auth.ensureUser(),
      settings.getSettings(),
      logs.getLogs(),
      logs.clearLogsOutdated,
      cutResults('logs'),
    ],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [logs.checkTable(), auth.ensureUser(['admin']), logs.createLog(), cutResults('log')],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [logs.checkTable(), auth.ensureUser(['admin']), logs.clearData(), cutResults('logs')],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [logs.checkTable(), auth.ensureUser(), logs.getLog(), cutResults('log')],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [logs.checkTable(), auth.ensureUser(['admin']), logs.updateLog(), cutResults('log')],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [logs.checkTable(), auth.ensureUser(['admin']), logs.getLog(), logs.patchLog(), cutResults('log')],
  },
  {
    method: 'DELETE',
    route: '/all',
    handlers: [logs.checkTable(), auth.ensureUser(['admin']), logs.deleteLogs],
  },
  {
    method: 'DELETE',
    route: '/time',
    handlers: [logs.checkTable(), auth.ensureUser(), logs.getLogs(), logs.deleteLogsByTime],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [logs.checkTable(), auth.ensureUser(['admin']), logs.getLog(), logs.deleteLog()],
  },
]

export default { baseUrl, routes }
