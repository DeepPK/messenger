module.exports = {
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-report',
      outputName: 'junit-test-results.xml',
      uniqueOutputName: false
    }]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage'
};