// import * as common from '../common/controller'
// import * as tsts from '../tsts/controller'
import root from './controller'

export const baseUrl = '/'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      root.App,
      root.Bpp,
    ],
  },
]

export default { baseUrl, routes }
