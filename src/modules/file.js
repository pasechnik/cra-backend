import debug from 'debug'
import fs from 'fs'
import mPath from 'path'
import { isFunction } from './context'

const error = debug('app:module:file:error')
const log = debug('app:module:file')

export const fReadDir = (filename, mask) => {
  const file = mPath.resolve(process.cwd(), filename)
  log(file)
  if (fs.existsSync(file)) {
    return fs.readdirSync(file)
      .filter(t => mask === undefined || mask.test(t))
  }
  return []
}

export const readFile = (filename, def, cb) => async (key) => {
  const file = mPath.resolve(process.cwd(), filename)
  log(file)
  if (fs.existsSync(file)) {
    let result = fs.readFileSync(file, 'utf8')
      .trim()
    if (cb !== undefined) {
      result = await cb(result)
    }
    return {
      [key]: result,
    }
  }
  return def
}

export const fReadFile = async (id, fPathResolve, def, cb) => {
  const file = fPathResolve(id)
  log({ file })
  const fileExists = id !== undefined ? fs.existsSync(file) : false
  let content = def
  if (fileExists) {
    log(`file: ${id} exists`)
    content = fs.readFileSync(file, 'utf8')
      .trim()
  } else {
    log(`file: ${id} does not exist`)
    log('trying default')
    const fileDefault = fPathResolve(def)
    const fileDefaultExists = fileDefault !== undefined ? fs.existsSync(fileDefault) : false
    if (fileDefaultExists) {
      log(`file: ${fileDefault} exists`)
      content = fs.readFileSync(fileDefault, 'utf8')
        .trim()
    }
  }

  return cb !== undefined ? cb(content) : content
}

export const fReadFile2 = (fGetParam, fPathResolve, def, cb) => async (key, ctx) => {
  const id = isFunction(fGetParam) ? fGetParam('id', ctx, undefined) : fGetParam

  const file = fPathResolve(id)
  log({ file })
  const fileExists = id !== undefined ? fs.existsSync(file) : false
  let content = def
  if (fileExists) {
    log(`file: ${id} exists`)
    content = fs.readFileSync(file, 'utf8')
      .trim()
  } else {
    log(`file: ${id} does not exist`)
    log('trying default')
    const fileDefault = fPathResolve(def)
    const fileDefaultExists = fileDefault !== undefined ? fs.existsSync(fileDefault) : false
    if (fileDefaultExists) {
      log(`file: ${fileDefault} exists`)
      content = fs.readFileSync(fileDefault, 'utf8')
        .trim()
    }
  }

  // log({ content })

  return {
    [key]: cb !== undefined ? await cb(content) : content,
  }
}
