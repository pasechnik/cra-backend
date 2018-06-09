export default {
  env: 'production',
  port: process.env.PORT || 4060,
  secureport: process.env.HTPPS_PORT || 4443,
  cassandra: { contactPoints: [process.env.CASSANDRA || '127.0.0.1'], keyspace: 'cra' },
  NEXMO_API_KEY: 'cb34b5d6',
  NEXMO_API_SECRET: 'LqWHyKc2NmwHAnNo',
  NEXMO_BRAND: 'S2Trade',
}
