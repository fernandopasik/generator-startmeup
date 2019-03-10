module.exports = function typescript() {
  if (this.willInstall('@babel/core')) {
    this.devDependencies.push('babel-eslint');
    this.eslintConfig.parser = 'babel-eslint';
  }
};
