const defaultCoverageThreshold = 80
const config = {
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: defaultCoverageThreshold,
      functions: defaultCoverageThreshold,
      lines: defaultCoverageThreshold,
      statements: defaultCoverageThreshold
    }
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', 'lambda-layers/nodejs/dynamoHelper.js'],
  testMatch: ['**/__tests__/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', 'lambda-layers/nodejs/dynamoHelper.js']
}

module.exports = config
