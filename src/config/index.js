import common from './env/common'
import development from './env/development'
import production from './env/production'
import test from './env/tst'

const env = process.env.NODE_ENV || 'development'
let config = {}
// const config = require(`./env/${env}`).default

switch (env) {
  case 'production':
    config = production
    break
  case 'test':
    config = test
    break
  case 'development':
  default:
    config = development
}

export default { ...common, ...config }
