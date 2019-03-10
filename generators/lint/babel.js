module.exports = function typescript() {
  const { devDependencies = {} } = this.pkgJson;

  if (devDependencies['@babel/core']) {
    this.devDeps.push('babel-eslint');
    this.eslintConfig.parser = 'babel-eslint';
  }
};
