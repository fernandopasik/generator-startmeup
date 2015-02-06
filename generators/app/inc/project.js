'use strict';

module.exports = function () {
  this.mkdir('app');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('README.md');
  this.copy('LICENSE');
};
