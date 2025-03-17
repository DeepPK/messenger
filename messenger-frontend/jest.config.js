module.exports = {
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-report',
      outputName: 'junit-test-results.xml',
      suiteNameTemplate: '{filepath}',
      ancestorSeparator: ' > '
    }]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom'
};