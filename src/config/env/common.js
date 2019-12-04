import debug from 'debug';

const error = debug('app:config:error');
const log = debug('app:config');

const config = {
  env: 'production',
  port: process.env.PORT || 4060,
  secureport: process.env.HTPPS_PORT || 4443,
  // cache: { name: 'roomsConfig' },
  // storage: { name: 'rooms' },
  cassandra: {
    contactPoints: [process.env.CASSANDRA || '1.0.0.1'],
    keyspace: 'cra',
  },
  VERSION: 'VERSION',
  offlineConfigs: './configs/offline',
};

log({ config });
export default config;
