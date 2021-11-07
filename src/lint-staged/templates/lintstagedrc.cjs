// <% if (typescript) { %>
const fs = require('fs');

const generateTSConfig = (stagedFilenames) => {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  tsconfig.include = stagedFilenames;
  fs.writeFileSync('tsconfig.lint.json', JSON.stringify(tsconfig));
  return 'tsc --noEmit --project tsconfig.lint.json';
};

const deleteTSConfig = () => {
  fs.unlink('tsconfig.lint.json');
};
// <% } %>

module.exports = {
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
