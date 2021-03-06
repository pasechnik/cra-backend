import { obj } from 'the-utils'

export const fields = {
  id: 0,
  name: '',
  value: '',
}

export const output = props => cast(props)
export const cast = props => obj.cast(fields, props)
export const patch = (o, props) => obj.cast(o, props)
export const filter = props => obj.createFilter(fields, props)
export const createFrom = async (src, data) => cast(data)
