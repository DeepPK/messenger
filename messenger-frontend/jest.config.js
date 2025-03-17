module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      'jest-junit',
        {
          outputDirectory: 'test-report',
          outputName: 'junit-test-results.xml',
          suiteName: 'Jest Tests',
          usePathForSuiteName: true
        }
    ]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};