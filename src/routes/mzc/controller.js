import generalSettingsFront from './data/generalSettingsFront'
import existingCards from './data/existingCards'
import countries from './data/countries'
import deposit from './data/deposit'
import pagoCountries from './data/pagoCountries'
import { t } from './data/test'
import { runOutput, spreadArrayResults, spreadResults } from '../../modules/context'

const routeKey = 'mzc'
const routeKeys = `${routeKey}s`

export const getGeneralSettingsFront = (key = routeKeys) => runOutput(key, k => ({ [k]: generalSettingsFront.succes }))
export const getExistingCards = (key = routeKeys) => runOutput(key, k => ({ [k]: existingCards }))
export const getCountries = (key = routeKeys) => runOutput(key, k => ({ [k]: countries }))
export const getPagoCountries = (key = routeKeys) => runOutput(key, k => ({ [k]: pagoCountries }))
export const postDeposit = (key = routeKeys) => runOutput(key, k => ({ [k]: deposit.fail1 }))
export const getSpreadResults = (key = routeKeys) => spreadResults(key)
export const getSpreadArrayResults = (key = routeKeys) => spreadArrayResults(key)
export const getTest = (key = routeKeys) => runOutput(routeKeys, t(key))
