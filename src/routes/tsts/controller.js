import debug from 'debug'
import uuid from 'uuid'
import * as Test from '../../models/tst'
// import { runCheckTable } from './module'
// import { runFunction } from '../common/module'

const error = debug('app:tests:controller:error')
const log = debug('app:tests:controller')
const routeKey = 'test'
const routeKeys = `${routeKey}s`

// export const checkTable = () => runFunction(routeKey, runCheckTable)

export const getTests = (key = 'tests') => async (ctx, next) => {
  const test = Test.output({ id: uuid(), name: 't1', value: 'Test 1' })
  ctx.body = { ...ctx.body, [key]: [test, test] }
  if (next) {
    return next()
  }

  return ctx
}

export const getTest = (key = 'test') => async (ctx, next) => {
  const test = Test.output({ id: uuid(), name: 't1', value: 'Test 1' })
  ctx.body = { ...ctx.body, [key]: test }

  if (next) {
    return next()
  }

  return ctx
}

export const delTest = (key = 'test') => async (ctx, next) => {
  const test = Test.output({ id: uuid(), name: 't1', value: 'Test 1' })
  ctx.body = {
    ...ctx.body,
    [key]: test,
    success: true,
    id: uuid(),
  }

  if (next) {
    return next()
  }

  return ctx
}
