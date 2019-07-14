module.exports = {
  roots: ['src'],
  collectCoverageFrom: ['generators/**/*.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
