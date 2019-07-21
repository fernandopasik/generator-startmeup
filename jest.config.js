module.exports = {
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
