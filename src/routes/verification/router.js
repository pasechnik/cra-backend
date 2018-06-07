// import * as common from '../common/controller'
// import * as tsts from '../tsts/controller'
import verification from './controller'

export const baseUrl = '/v1/verification'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      verification.Root,
    ],
  },
  {
    method: 'POST',
    route: '/phone',
    handlers: [
      verification.Phone,
    ],
  },
  {
    method: 'POST',
    route: '/code',
    handlers: [
      verification.Code,
    ],
  },
]

export default { baseUrl, routes }
