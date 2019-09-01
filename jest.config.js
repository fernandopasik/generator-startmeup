module.exports = {
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  transform: { '^.+\\.[t|j]sx?$': 'ts-jest' },
};
