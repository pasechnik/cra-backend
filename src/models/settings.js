import { obj } from 'the-utils'
import config from '../config'

export const id = '11111111-1111-1111-1111-111111111111'

export const fields = {
  id,
  clearLogsInterval: 0,
  showInfrastructure: false,
  restApiUrl: config.restApiUrl,
  restApiEnabled: config.restApiEnabled,
  applianceIp: config.applianceIp,
  spinnakerEnabled: false,
  cnfEnabled: true,
  initialized: false,
}

export const cast = props => ({ name: 'default', ...obj.cast(fields, props) })
// export const cast = props => obj.cast(fields, props)
export const filter = props => obj.createFilter(fields, props)
export const output = props => cast(props)
export const patch = (o, props) => obj.cast(o, props)
