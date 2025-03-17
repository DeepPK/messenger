javascript
Copy
module.exports = {
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports', outputName: 'junit-test-results.xml' }]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage'
};
