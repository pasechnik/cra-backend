import * as settings from './controller'
import * as common from '../common/controller'
import * as tsts from '../tsts/controller'
import * as application from '../applications/controller'
import * as artifactory from '../artifactory/controller'
import * as boms from '../boms/controller'
import * as clusters from '../clusters/controller'
import * as gates from '../gates/controller'
import * as servers from '../servers/controller'
import * as vnfs from '../vnfs/controller'

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
      application.checkTable(),
      artifactory.checkTable(),
      boms.checkTable(),
      clusters.checkTable(),
      gates.checkTable(),
      servers.checkTable(),
      settings.checkTable(),
      vnfs.checkTable(),

      application.clearData(),
      artifactory.clearData(),
      boms.clearData(),
      clusters.clearData(),
      gates.clearData(),
      servers.clearData(),
      settings.clearData(),
      vnfs.clearData(),
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
