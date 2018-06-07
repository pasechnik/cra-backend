import debug from 'debug'
import json from 'json-promise'
import rpn from 'request-promise-native'
import config from '../../config'

import { getCtxParam } from '../common/module'

const error = debug('app:verification:module:error')
const log = debug('app:verification:module')

// const nexmo = new Nexmo({
//   apiKey: config.NEXMO_API_KEY,
//   apiSecret: config.NEXMO_API_SECRET,
// })

const urlPhone = 'https://api.nexmo.com/verify/json'
const urlCode = 'https://api.nexmo.com/verify/check/json'

export const doPostCall = async (url, data, def) => {
  let result = def
  try {
    log(`making POST ${url}`)
    log({ body: data })
    const options = {
      method: 'POST',
      url,
      json: true, // Automatically stringifies the body to JSON
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data,
    }
    const s = await rpn(options)
    result = await json.parse(s)
  } catch (err) {
    error(`can't parse result from ${url} Error: ${err.message}`)
    throw err
  }
  return result
}


export const mPhone = () => async (key, ctx) => {
  const getRequestParam = getCtxParam(ctx, ['request', 'body'])
  const phone = getRequestParam('phone', undefined)

  if (phone === undefined) {
    throw Error('phone parameter is empty')
  }
  const result = await doPostCall(urlPhone, {
    api_key: config.NEXMO_API_KEY, api_secret: config.NEXMO_API_SECRET, brand: config.NEXMO_BRAND, number: phone,
  }, {})
  log(result)
  return { [key]: { phone, result } }
}

export const mCode = () => async (key, ctx) => {
  const getRequestParam = getCtxParam(ctx, ['request', 'body'])
  const requestId = getRequestParam('request_id', undefined)
  const code = getRequestParam('code', undefined)

  if (requestId === undefined) {
    throw Error('request_id parameter is empty')
  }
  if (code === undefined) {
    throw Error('code parameter is empty')
  }
  const result = await doPostCall(urlCode, {
    api_key: config.NEXMO_API_KEY, api_secret: config.NEXMO_API_SECRET, request_id: requestId, code,
  }, {})
  log(result)
  return { [key]: { code, request_id: requestId, result } }
}

export default { mPhone, mCode }
