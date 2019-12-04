import * as forms from './controller'
import * as auth from '../auth/controller'
import { spreadResults } from '../../modules/context'

export const baseUrl = '/v1/forms'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [auth.ensureUser(), forms.getForms()],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [auth.ensureUser(), forms.getForm(), forms.parseForm(), spreadResults('form')],
  },
]

// "additional.json": "{\n  \"a\": \"1\",\n  \"b\": \"1\"\n}\n"

export default { baseUrl, routes }
