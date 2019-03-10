module.exports = function flow() {
  if (this.willInstall('flow-bin')) {
    this.eslintConfig.plugins.push('flowtype');
    this.devDependencies.push('eslint-plugin-flowtype');
  }
};
