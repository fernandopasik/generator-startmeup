const dependencies = require('../app/dependencies');

module.exports = function typescript() {
  if (dependencies.has('@babel/core')) {
    dependencies.addDev(['babel-eslint']);
    this.eslintConfig.parser = 'babel-eslint';
  }
};
