import bcrypt from 'bcrypt-nodejs'
import { obj } from 'the-utils'
import config from '../config/env/common'

export const id = '11111111-1111-1111-1111-111111111111'

export const defaults = {
  username: 'admin',
  role: 'admin',
  password: config.defaultAdminPass || '',
}

export const fields = {
  id: 0,
  username: '',
  password: '',
  role: 'user',
}

export const filter = props => obj.createFilter(fields, props)

// export const cast = props => obj.cast(fields, props)
export const input = (props) => {
  const result = obj.cast(fields, props)
  result.password = bcrypt.hashSync(result.password)
  result.name = result.username
  return result
}

export const cast = (props) => {
  const result = obj.cast(fields, props)
  result.name = result.username
  return result
}

// export const patch = (o, props) => obj.cast(o, props)
export const patch = (o, props) => {
  const result = obj.cast(o, props)
  if (props.password !== undefined) {
    result.password = bcrypt.hashSync(result.password)
  }
  result.name = result.username
  return result
}

// export const output = props => cast(props)
export const output = (props) => {
  const result = cast(props)
  delete result.password
  delete result.name
  return result
}
