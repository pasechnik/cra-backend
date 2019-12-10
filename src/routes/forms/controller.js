import path from 'path'
import debug from 'debug'
import sanitize from 'sanitize-filename'
import { runCheckTable, parseForm as fParseForm, getForms as fGetForms } from './module'
import { getCtxParam, parseJson, runFunction, runOutput } from '../../modules/context'
import { fReadFile2 } from '../../modules/file'

const error = debug('app:forms:controller:error')
const log = debug('app:forms:controller')
const routeKey = 'form'
const routeKeys = `${routeKey}s`

export const parseForm = () => runOutput(routeKey, fParseForm)
export const getForms = () => runOutput(routeKeys, fGetForms(path.resolve(process.cwd(), 'configs/deploy'), []))
export const getForm = () =>
  runOutput(
    routeKey,
    fReadFile2(
      (key, ctx, def) => getCtxParam(ctx, 'params')(key, def),
      form => path.resolve(process.cwd(), 'configs/deploy', `${sanitize(form)}.json`),
      'default',
      parseJson,
    ),
  )
export const checkTable = () => runFunction(routeKey, runCheckTable)
