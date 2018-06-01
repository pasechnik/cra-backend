import { obj } from 'the-utils'

export const fields = {
  id: 'temp',
  refreshing: false,
  data: [],
  fields: [],
}

export const cast = props => obj.cast(fields, props)
export const filter = props => obj.createFilter(fields, props)
