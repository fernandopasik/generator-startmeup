module.exports = function flow() {
  const { devDependencies = {} } = this.pkgJson;

  if (devDependencies['flow-bin']) {
    this.eslintConfig.plugins.push('flowtype');
    this.devDeps.push('eslint-plugin-flowtype');
  }
};
