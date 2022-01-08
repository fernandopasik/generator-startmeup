module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s', '!src/**/templates/**'],
  globals: { 'ts-jest': { useESM: true } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
};
