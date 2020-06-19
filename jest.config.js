module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s'],
  globals: { 'ts-jest': { tsConfig: 'tsconfig.all.json' } },
  testEnvironment: 'node',
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
};
