const {defaults} = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: ['**/test/**/*.spec.ts'],
  transform: {
    '^.+\\.ts': 'ts-jest'
  },
};