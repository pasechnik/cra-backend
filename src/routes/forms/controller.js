import fs from 'fs'
import path from 'path'
import debug from 'debug'
import sanitize from 'sanitize-filename'
import { obj } from 'the-utils'
import { parseField, runCheckTable } from './module'
import { runFunction } from '../common/module'

const error = debug('app:forms:controller:error')
const log = debug('app:forms:controller')
const routeKey = 'form'
const routeKeys = `${routeKey}s`

// const dir = `${__dirname} + '/configs/deploy`
const dir = path.resolve(process.cwd(), 'configs/deploy')

export const checkTable = () => runFunction(routeKey, runCheckTable)

export const getForms = async (ctx, next) => {
  const fileExists = fs.existsSync(dir)
  try {
    if (fileExists) {
      const forms = fs.readdirSync(dir)
        .map(t => t.substr(0, t.lastIndexOf('.')))
      // const content = JSON.parse(fs.readFileSync(file))
      ctx.body = { ...ctx.body, forms }
    }
  } catch (err) {
    error(`error parsing form json file ${err}`)
  }

  if (!fileExists) {
    ctx.throw(404, `forms dir '${dir}' does not exist`)
  }

  if (next) {
    return next()
  }
  return ctx
}


export const getForm = async (ctx, next) => {
  const id = sanitize(obj.get(ctx.params, 'id', ''))
  const file = path.resolve(dir, `${id}.json`)
  const fileExists = id ? fs.existsSync(file) : false
  try {
    if (fileExists) {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'))
      ctx.body = { ...ctx.body, ...content }
    }
  } catch (err) {
    error(`error parsing form json file ${err}`)
  }

  if (!fileExists) {
    ctx.throw(404, `form '${id}' is not found`)
  }

  if (next) {
    return next()
  }
  return ctx
}

export const parseForm = async (ctx, next) => {
  try {
    let schema = obj.deepGet(ctx, ['body', 'schema'], {})

    schema = Object.keys(schema)
      .reduce((a, b) => ({ ...a, [b]: parseField(schema[b]) }), {})
    ctx.body = { ...ctx.body, schema }
  } catch (err) {
    error(`error parsing form json file ${err}`)
  }

  if (next) {
    return next()
  }
  return ctx
}

