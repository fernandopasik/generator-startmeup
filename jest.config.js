module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json', useESM: true } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
};
