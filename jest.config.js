const appName = 'argentbank_frontend'
const appVersion = '0.1.0'
const osPlatform = 'linux'
const osRelease = 'ubuntu_plucky_puffin'
const osVersion = '25.04'
const buildName = 'kernel'
const buildNumber = '6.14'

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^test-utils$': '<rootDir>/test/app/test-utils.tsx',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  },
  reporters: [
    'default',
    ['jest-ctrf-json-reporter', {
      appName,
      appVersion,
      osPlatform,
      osRelease,
      osVersion,
      buildName,
      buildNumber
    }]
  ]
};