import * as categories from './controller'
import * as auth from '../auth/controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/categories'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [categories.checkTable(), categories.getCategories(), cutResults('categories')],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [categories.checkTable(), categories.createCategory(), cutResults('category')],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [categories.checkTable(), categories.clearData(), cutResults('categories')],
  },
  {
    method: 'GET',
    route: '/cats/:id',
    handlers: [
      categories.checkTable(),
      categories.getCategory(),
      categories.getCategories(),
      categories.findCategoriesByParent(),
      cutResults('categories'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [categories.checkTable(), categories.getCategory(), cutResults('category')],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [categories.checkTable(), categories.getCategory(), categories.patchCategory(), cutResults('category')],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [categories.checkTable(), categories.getCategory(), categories.updateCategory(), cutResults('category')],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      categories.checkTable(),
      categories.getCategory(),
      categories.deleteCategory(),
      // cutResults('category'),
    ],
  },
]

export default { baseUrl, routes }
