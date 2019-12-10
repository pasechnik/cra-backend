import { obj } from 'the-utils'
import * as faker from 'faker'

export const fields = {
  id: 0,
  categoryId: null,
  name: '',
  img: '',
  description: '',
}

export const cast = props => {
  const onProps = { ...props, img: props.img === undefined || props.img.length === 0 ? faker.image.image() : props.img }
  return obj.cast(fields, onProps)
}
export const output = props => cast(props)
export const patch = (o, props) => obj.cast(o, props)
export const filter = props => obj.createFilter(fields, props)
export const createFrom = async (src, data) => cast(data)
