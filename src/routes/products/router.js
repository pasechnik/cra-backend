import * as auth from '../auth/controller'
import * as categories from '../categories/controller'
import * as products from './controller'
import { cutResults } from '../../modules/context'

export const baseUrl = '/v1/products'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [products.checkTable(), products.getProducts(), cutResults('products')],
  },
  {
    method: 'POST',
    route: '/',
    handlers: [products.checkTable(), products.createProduct(), cutResults('product')],
  },
  {
    method: 'GET',
    route: '/clear',
    handlers: [products.checkTable(), products.clearData(), cutResults('products')],
  },
  {
    method: 'GET',
    route: '/cats/:id',
    handlers: [
      products.checkTable(),
      categories.checkTable(),
      categories.getCategory(),
      products.getProducts(),
      products.findProductsByCategory(),
      cutResults('products'),
    ],
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [products.checkTable(), products.getProduct(), cutResults('product')],
  },
  {
    method: 'PATCH',
    route: '/:id',
    handlers: [products.checkTable(), products.getProduct(), products.patchProduct(), cutResults('product')],
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [products.checkTable(), products.getProduct(), products.updateProduct(), cutResults('product')],
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      products.checkTable(),
      products.getProduct(),
      products.deleteProduct(),
      // cutResults('product'),
    ],
  },
]

export default { baseUrl, routes }
