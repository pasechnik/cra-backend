import path from 'path';
import { cast, patch, output } from '../../models/category';
import { getEngine, runCheckTable } from './module';
import { runFunction, runOutput, parseJson, bodyFind, getCtxParam } from '../../modules/context';
import { fReadFile2 } from '../../modules/file';
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db';
import config from '../../config';

const routeKey = 'category';
const routeKeys = 'categories';

export const checkTable = () => runFunction(routeKey, runCheckTable);
export const getCategories = () => runOutput(routeKeys, dbGetAll(getEngine, output));
export const createCategory = () => runOutput(routeKey, dbCreate(getEngine, cast, output));
export const getCategory = () => runOutput(routeKey, dbGetOne(getEngine, cast, output));
export const updateCategory = () => runOutput(routeKey, dbUpdate(getEngine, cast, output));
export const patchCategory = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch));
export const deleteCategory = () => runOutput(routeKey, dbDelete(getEngine, cast, output));
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast));
// (src, subj, callback) => async (key, ctx)
export const findApp = () =>
  runOutput(
    routeKey,
    bodyFind(
      routeKeys,
      (key, ctx, def) => getCtxParam(ctx, 'params')('id', def),
      id => t => t.id === id,
    ),
  );
export const getLocalCategories = () =>
  runOutput(
    routeKeys,
    fReadFile2('categories', () => path.resolve(process.cwd(), config.categories), [], parseJson),
  );
