module.exports = {
  reporters: [
      'default',
      ['jest-junit', {
        outputDirectory: 'test-report',
        outputName: 'junit-test-results.xml',
        suiteName: 'Frontend Tests',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' › '
      }]
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};