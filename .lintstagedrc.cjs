const fs = require('fs');

const lintTSConfig = 'tsconfig.lint.json';

const generateTSConfig = (stagedFilenames) => {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  tsconfig.include = stagedFilenames;
  fs.writeFileSync(lintTSConfig, JSON.stringify(tsconfig));
  return 'tsc --noEmit --project tsconfig.lint.json';
};

const deleteTSConfig = (stagedFilenames) => {
  stagedFilenames.length = 0;
  if (fs.existsSync(lintTSConfig)) {
    fs.unlinkSync(lintTSConfig);
  }
  return '';
};

module.exports = {
  '*': ['prettier --check'],
  '*.{js,ts}': ['eslint', generateTSConfig, deleteTSConfig, 'jest --bail --findRelatedTests'],
};
