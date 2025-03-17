const path = require('path');

module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: path.join(__dirname, 'test-report'),
        outputName: 'junit-test-results.xml',
        suiteName: 'Jest Tests'
      }
    ]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: path.join(__dirname, 'coverage'),
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};