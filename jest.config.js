module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  globals: { 'ts-jest': { tsConfig: 'tsconfig.all.json' } },
  testEnvironment: 'node',
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
};
