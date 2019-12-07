import { cast, patch, output } from '../../models/category'
import { getEngine, runCheckTable } from './module'
import { runFunction, runOutput, bodyFind, getCtxParam, bodyFilter } from '../../modules/context'
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db'

const routeKey = 'category'
const routeKeys = 'categories'

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getCategories = (key = routeKeys) => runOutput(key, dbGetAll(getEngine, output))
export const createCategory = () => runOutput(routeKey, dbCreate(getEngine, cast, output))
export const getCategory = () => runOutput(routeKey, dbGetOne(getEngine, cast, output))
export const updateCategory = () => runOutput(routeKey, dbUpdate(getEngine, cast, output))
export const patchCategory = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch))
export const deleteCategory = () => runOutput(routeKey, dbDelete(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))
// (src, subj, callback) => async (key, ctx)
export const findCategory = () =>
  runOutput(
    routeKey,
    bodyFind(
      routeKeys,
      (key, ctx, def) => getCtxParam(ctx, 'params')('id', def),
      id => t => t.id === id,
    ),
  )
export const findCategoriesByParent = () =>
  runOutput(
    routeKeys,
    bodyFilter(
      routeKeys,
      (key, ctx, def) => getCtxParam(ctx, 'params')('id', def),
      id => t => t.categoryId === id,
    ),
  )
