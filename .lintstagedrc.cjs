module.exports = {
  '*': ['prettier --check'],
  '*.{js,ts}': ['eslint', 'jest --bail --findRelatedTests'],
};
