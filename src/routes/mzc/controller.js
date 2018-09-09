import generalSettingsFront from './data/generalSettingsFront'
import existingCards from './data/existingCards'
import countries from './data/countries'
import deposit from './data/deposit'
import pagoCountries from './data/pagoCountries'
import { runOutput, spreadArrayResults, spreadResults } from '../../modules/context'

const routeKey = 'mzc'
const routeKeys = `${routeKey}s`

export const getGeneralSettingsFront = () => runOutput(routeKeys, key => ({ [key]: generalSettingsFront }))
export const getExistingCards = () => runOutput(routeKeys, key => ({ [key]: existingCards }))
export const getCountries = () => runOutput(routeKeys, key => ({ [key]: countries }))
export const getPagoCountries = () => runOutput(routeKeys, key => ({ [key]: pagoCountries }))
export const postDeposit = () => runOutput(routeKeys, key => ({ [key]: deposit }))
export const getSpreadResults = key => spreadResults(key !== undefined ? key : routeKeys)
export const getSpreadArrayResults = key => spreadArrayResults(key !== undefined ? key : routeKeys)

