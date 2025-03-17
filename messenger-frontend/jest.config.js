const path = require('path');

module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: path.join(process.cwd(), 'test-report'),
        outputName: 'junit-test-results.xml',
        suiteName: 'Jest Tests'
      }
    ]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};