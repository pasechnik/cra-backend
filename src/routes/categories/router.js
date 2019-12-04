import * as categories from './controller';
import * as auth from '../auth/controller';
import { cutResults } from '../../modules/context';

export const baseUrl = '/v1/categories';

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [auth.ensureUser(), categories.getCategories(), cutResults('categories')],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [auth.ensureUser(['admin']), categories.createCategory(), cutResults('application')],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [auth.ensureUser(['admin']), categories.clearData(), cutResults('categories')],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [auth.ensureUser(), categories.getCategory(), cutResults('application')],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [
      auth.ensureUser(['admin']),
      categories.getCategory(),
      categories.patchCategory(),
      cutResults('application'),
    ],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      auth.ensureUser(['admin']),
      categories.getCategory(),
      categories.updateCategory(),
      cutResults('application'),
    ],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      auth.ensureUser(['admin']),
      categories.getCategory(),
      categories.deleteCategory(),
      // cutResults('application'),
    ],
  },
];

export default {
  baseUrl,
  routes,
};
