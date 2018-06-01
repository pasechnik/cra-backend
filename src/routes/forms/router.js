import * as forms from './controller'
import * as tests from '../tsts/controller'

export const baseUrl = '/v1/forms'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      forms.getForms,
      // tests.getTests('forms'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      forms.getForm,
      forms.parseForm,
      // tests.getTest('forms_test'),
    ],
  },
]

// "additional.json": "{\n  \"a\": \"1\",\n  \"b\": \"1\"\n}\n"

export default { baseUrl, routes }
