module.exports = {
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
