module.exports = {
  collectCoverageFrom: ['src/**/*.{j,t}s', '!src/**/templates/**'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
};
