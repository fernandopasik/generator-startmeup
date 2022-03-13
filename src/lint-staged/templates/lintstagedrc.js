/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types,  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, security/detect-non-literal-fs-filename */
/// <% if (typescript) { %><% if (module) { -%>
import fs from 'fs';
// <% } else { %>const fs = require('fs');<% } %>

const lintTSConfig = 'tsconfig.lint.json';

const generateTSConfig = (stagedFilenames) => {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  tsconfig.include = stagedFilenames;
  fs.writeFileSync(lintTSConfig, JSON.stringify(tsconfig));
  return 'tsc --noEmit --project tsconfig.lint.json';
};

const deleteTSConfig = (stagedFilenames) => {
  // eslint-disable-next-line no-param-reassign
  stagedFilenames.length = 0;
  if (fs.existsSync(lintTSConfig)) {
    fs.unlinkSync(lintTSConfig);
  }
  return '';
};
// <% } %>

/// <% if (module) { %>
export default {
  // <% } else { %>module.exports = {<% } %>
  // <% if (prettier) { %>
  '*': ['prettier --check'],
  // <% } %>
  // <% if (jsTarget) { %>
  '<%= jsTarget %>': [
    // <% if (eslint) { %>
    'eslint',
    // <% } %>
    // <% if (typescript) { %>
    generateTSConfig,
    deleteTSConfig,
    // <% } %>
    // <% if (jest) { %>
    'jest --bail --findRelatedTests',
    // <% } %>
  ],
  // <% } %>
  // <% if (cssTarget && stylelint) { %>
  '<%= cssTarget %>': ['stylelint<% if (scss) { %> --syntax=scss<% } %>'],
  // <% } %>
};
