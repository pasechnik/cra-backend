import { cast, patch, output } from '../../models/product'
import { getEngine, runCheckTable } from './module'
import { runFunction, runOutput, bodyFind, getCtxParam, bodyFilter } from '../../modules/context'
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db'

const routeKey = 'product'
const routeKeys = 'products'

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getProducts = (key = routeKeys) => runOutput(key, dbGetAll(getEngine, output))
export const createProduct = () => runOutput(routeKey, dbCreate(getEngine, cast, output))
export const getProduct = () => runOutput(routeKey, dbGetOne(getEngine, cast, output))
export const updateProduct = () => runOutput(routeKey, dbUpdate(getEngine, cast, output))
export const patchProduct = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch))
export const deleteProduct = () => runOutput(routeKey, dbDelete(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))
// (src, subj, callback) => async (key, ctx)
export const findProduct = () =>
  runOutput(
    routeKey,
    bodyFind(
      routeKeys,
      (key, ctx, def) => getCtxParam(ctx, 'params')('id', def),
      id => t => t.id === id,
    ),
  )
export const findProductsByCategory = () =>
  runOutput(
    routeKeys,
    bodyFilter(
      routeKeys,
      (key, ctx, def) => getCtxParam(ctx, 'params')('id', def),
      id => t => t.categoryId === id,
    ),
  )
