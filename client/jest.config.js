module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./src/setupTests.js'], // updated path
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePaths: ['<rootDir>/src/'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/build/**',
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  globals: {
    window: true,
    localStorage: true,
    sessionStorage: true,
  },
  testPathIgnorePatterns: ['/node_modules/', 'App.test.js$'],
};
