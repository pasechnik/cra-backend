// ========= Object
const has = (o, property) => Object.prototype.hasOwnProperty.call(o, property)

const getKeyValue = (o, property, defaultValue) => (o !== undefined && has(o, property) ? o[property] : defaultValue)

const get = (o, property, defaultValue) => (o !== undefined && has(o, property) ? o[property] : defaultValue)

const set = (o, property, value) => ({ ...o, [property]: value })

const deep = (obj, props, defaultValue) => {
  // If we have reached an undefined/null property
  // then stop executing and return the default value.
  // If no default is provided it will return undefined.
  if (obj === undefined || obj === null) {
    return defaultValue
  }

  // If the path array has no more elements, we've reached
  // the intended property and return its value
  if (props.length === 0) {
    return obj
  }

  // Prepare our found property and path array for recursion
  const foundSoFar = obj[props[0]]
  const remainingProps = props.slice(1)

  return deep(foundSoFar, remainingProps, defaultValue)
}

const deepGet = (obj, props, defaultValue) => {
  // If we have reached an undefined/null property
  // then stop executing and return the default value.
  // If no default is provided it will return undefined.
  if (obj === undefined || obj === null) {
    return defaultValue
  }

  // If the path array has no more elements, we've reached
  // the intended property and return its value
  if (props.length === 0) {
    return obj
  }

  // Prepare our found property and path array for recursion
  const foundSoFar = obj[props[0]]
  const remainingProps = props.slice(1)

  return deepGet(foundSoFar, remainingProps, defaultValue)
}

const isEmpty = o => !(o.constructor === Object && Object.keys(o).length > 0)

const toArray = o => Object.keys(o).map(t => o[t])

const toArrayFilter = (o, r) =>
  Object.keys(o)
    .filter(t => r.test(t))
    .map(t => o[t])

const cast = (fields, props) => {
  const item = Object.keys(fields).reduce((acc, val) => set(acc, val, get(props, val, fields[val])), {})
  if (has(props, '_id')) {
    set(item, '_id', get(props, '_id', 0))
    // item['_id'] = get(props, '_id', 0)
  }
  return item
}

export const createFilter = (fields, props) =>
  Object.keys(fields).reduce((acc, val) => (has(props, val) ? set(acc, val, get(props, val, fields[val])) : acc), {})

const filterKeys = (o, r) =>
  Object.keys(o)
    .filter(t => r.test(t))
    .reduce((n, t) => set(n, t, o[t]), {})

const isObject = a => typeof a === 'object' && a !== null

const objParse = row => {
  let parsedData = Object.assign({}, row)
  Object.keys(row).forEach(key => {
    if (isObject(row[key])) {
      const rowObjectFields = {}
      Object.keys(row[key]).forEach(ob => {
        rowObjectFields[`${key}-${ob}`] = row[key][ob]
      })
      parsedData = Object.assign(parsedData, rowObjectFields)
    }
  })
  return parsedData
}

const formatDetails = (ob, schema) => {
  const newDetails = {}
  Object.keys(ob).forEach(d => (newDetails[getKey(schema, d)] = ob[d]))
  return newDetails
}

const getKey = (rec, key) => {
  if (rec[key]) return rec[key].title || key
  return getKey(rec[Object.keys(rec)[0]], key)
}

// ======== Array
const isArray = a => a && Array.isArray(a)
const objByKey = (a, key) =>
  isArray(a)
    ? a.reduce((n, t) => {
        ;(n[t[key]] || (n[t[key]] = [])).push(t)
        return n
      }, {})
    : {}

const getArrValue = (a, index, defaultValue) => (typeof a[index] !== 'undefined' ? a[index] : defaultValue)

const objByPages = (a, rows) => {
  const inRows = rows === 0 ? 10 : rows
  return isArray(a)
    ? a.reduce((n, t, i) => {
        const j = Math.trunc(i / inRows)
        ;(n[j] || (n[j] = [])).push(t)
        return n
      }, {})
    : {}
}

const group = (s, a) => {
  const grouped = []
  a.forEach((f, i) => {
    if (i === 0) {
      return grouped.push(f)
    }
    const temp = {}
    s.forEach(k => {
      if (k.grouped && f[k.key] === a[i - 1][k.key]) {
        temp[k.key] = null
      } else {
        temp[k.key] = f[k.key]
      }
    })
    return grouped.push(temp)
  })
  return grouped
}

const getActive = (arr, key) => {
  const filtred = arr.filter(f => toBoolean(f.active))
  return filtred.length ? filtred[0][key] : ''
}

const deployIntegrateReformat = deployInstancesList => {
  const convertedData = {}
  deployInstancesList.forEach(s => {
    const name = getServiceName(deepGet(s, ['service'], ''))
    convertedData[name] = getServiceVersion(deepGet(s, ['service'], ''))
    convertedData[`cpu_${name}`] = deepGet(s, ['service', 'resources', 'cpu'], '')
    convertedData[`memory_${name}`] = deepGet(s, ['service', 'resources', 'memory'], '')
    convertedData[`instances_${name}`] = deepGet(s, ['numOfInstances'], '')
  })
  return convertedData
}

const deployReformat = deployInstancesList => {
  const convertedData = {}
  Object.keys(deployInstancesList).forEach(s => {
    convertedData[s] = getServiceVersion(deployInstancesList[s])
  })
  return convertedData
}

const getPodSatatus = pod => {
  const phase = deepGet(pod, ['status', 'phase'], '')
  const types = deepGet(pod, ['status', 'conditions'], []).filter(f => f.type === 'Ready')
  if (types.length) {
    return { phase, status: types[0].status }
  }
  return {}
}

const getFiltredData = (arr, fil, val, key) => {
  const filtred = arr.filter(f => f[fil] === val)
  return filtred.length ? filtred[0][key] : ''
}

/**
 * Checks whenever 2 arrays have intersection
 *
 * @param {Array} a
 * @param {Array} b
 *
 * @return {Boolean}
 */
export const hasintersect = (a, b) => a.reduce((r, x) => r || b.includes(x), false)

/**
 * Returns unique values from 2 arrays
 * @param {Array} a
 * @param {Array} b
 *
 * @return {Array}
 */
export const unique = (a, b) =>
  b.reduce(
    (r, x) => (r.includes(x) ? r : [...r, x]),
    a.reduce((r, x) => (r.includes(x) ? r : [...r, x]), []),
  )

/**
 *
 * @param a
 */
export const keyUnique = (a, key) => a.reduce((r, x) => [...unique(r, get(x, key, []))], [])

// =========== String
const template = (strings, ...keys) => (...values) => {
  const dict = getArrValue(values, [values.length - 1], {})
  return strings.reduce(
    (accumulator, part, i) =>
      accumulator +
      (Number.isInteger(keys[i - 1]) ? getArrValue(values, keys[i - 1], '') : getKeyValue(dict, keys[i - 1], '')) +
      part,
  )
}

const cmp = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const toBoolean = s => {
  if (s === undefined) {
    return false
  }
  const falsy = /^(?:f(?:alse)?|no?|0+)$/i
  return !falsy.test(s) && !!s
}

const ucFirst = string =>
  typeof string === 'string' || string instanceof String
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : string

const short = (a, b) => {
  a = a.toString()
  b = b.toString()
  let n = 0
  let i = 0
  for (i = 0, n = Math.max(a.length, b.length); i < n && a.charAt(i) === b.charAt(i); ++i) {}
  if (i === n) return 0
  return a.charAt(i) > b.charAt(i) ? -1 : 1
}

const search = (str1, str2) => String(str1 || ''.toLowerCase()).includes(String(str2 || ''.toLowerCase()))

const btoa = str => Buffer.from(str).toString('base64')

const makeBasicAuth = (n, p) => `Basic ${btoa(`${n}:${p}`)}`

const getServiceVersion = o =>
  deepGet(o, ['image'], '')
    .split(/[:]+/)
    .pop()
const getServiceName = o =>
  deepGet(o, ['image'], '')
    .split(/[/]+/)
    .pop()
    .split(/[:]+/)
    .shift()

const checkport = (host, port) => (host.indexOf(':') === -1 ? `${host}:${port}` : host)

// ======== Date n Time
const toUTCString = time => {
  const d = new Date()
  return time && d.setTime(time) ? d.toUTCString() : '-'
}

// ========= Exports
export const obj = {
  has,
  getKeyValue,
  get,
  set,
  deep,
  deepGet,
  isEmpty,
  toArray,
  toArrayFilter,
  cast,
  createFilter,
  filterKeys,
  isObject,
  objParse,
  formatDetails,
  getKey,
}

export const arr = {
  isArray,
  objByKey,
  getArrValue,
  objByPages,
  group,
  getActive,
  deployIntegrateReformat,
  deployReformat,
  getPodSatatus,
  getFiltredData,
}

export const str = {
  template,
  cmp,
  toBoolean,
  ucFirst,
  short,
  search,
  btoa,
  makeBasicAuth,
  getServiceVersion,
  getServiceName,
  checkport,
}

export const date = { toUTCString }
export default { obj, arr, str, date }
