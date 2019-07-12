const dependencies = require('../app/dependencies');

module.exports = function flow() {
  if (dependencies.has('flow-bin')) {
    this.eslintConfig.plugins.push('flowtype');
    dependencies.addDev(['eslint-plugin-flowtype']);
  }
};
