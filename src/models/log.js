import { obj } from 'the-utils'

export const fields = {
  id: 0,
  serverId: 0,
  username: '',
  status: 'info',
  action: '',
  server: '',
  date: 0,
  description: '',
  parameters: {},
}

export const cast = props => obj.cast(fields, props)
export const patch = (o, props) => obj.cast(o, props)
export const filter = props => obj.createFilter(fields, props)
export const output = props => cast(props)
