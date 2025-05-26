import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      moduleFileExtensions: ['ts', 'js', 'json'],
      transform: { '^.+\\.(t|j)s$': 'ts-jest' },
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
      testEnvironment: 'node',
      rootDir: '.',
    },
    {
      displayName: 'e2e',
      testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],
      moduleFileExtensions: ['ts', 'js', 'json'],
      transform: { '^.+\\.(t|j)s$': 'ts-jest' },
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
      testEnvironment: 'node',
      rootDir: '.',
    }
  ]
};

export default config;
