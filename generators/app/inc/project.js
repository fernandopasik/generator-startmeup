'use strict';

module.exports = function () {
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('README.md');
  this.copy('LICENSE');
};
