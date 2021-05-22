module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json' } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  testEnvironment: 'node',
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
};
