// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: /\/__tests__\/.*|(\\.|\/)(spec)\\.jsx?$/,
}
