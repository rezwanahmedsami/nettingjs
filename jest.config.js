// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/*.+(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
