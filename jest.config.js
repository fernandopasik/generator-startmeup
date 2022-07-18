module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s', '!src/**/templates/**'],
  moduleNameMapper: { '(.*)\\.js': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
};
