import debug from 'debug'
import fs from 'fs'
import path from 'path'
import sanitize from 'sanitize-filename'
import { obj } from 'the-utils'
import { mCheckTable, mGetEngine } from '../common/module'

const configDir = path.resolve(process.cwd(), 'configs')

let engine = null

const error = debug('app:applications:module:error')
const log = debug('app:applications:module')

export const getEngine = () => mGetEngine('forms')
export const runCheckTable = async () => mCheckTable('forms')


export const readFile = (dir, filename) => {
  const file = path.resolve(dir, filename)
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8')
  }
  return ''
}

export const fieldSelectFile = (f) => {
  const { src = '', ...result } = f
  result.type = 'Select'
  result.options = []

  const dir = path.resolve(configDir, sanitize(src))
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      result.options = files.map(t => ({ val: readFile(dir, t), label: t }))
    }
  } catch (err) {
    error(`error parsing form json file ${err}`)
  }
  return result
}

export const parseField = (f) => {
  const type = obj.get(f, 'type', 'Text')
  let result = { ...f }
  switch (type) {
    case 'SelectFile':
      result = fieldSelectFile(f)
      break
    default:
  }

  return result
}

