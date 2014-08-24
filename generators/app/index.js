// jshint es3:false
'use strict';

var
  path = require('path'),
  yeoman = require('yeoman-generator'),
  rootDir = path.join(__dirname, '../../'),
  StartMeUpGenerator;

StartMeUpGenerator = yeoman.generators.Base.extend({

  init: function () {

    this.pkg = require(rootDir + 'package.json');

    // Launch npm install and bower install
    // at the end of the generator exec
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  welcome: require('./inc/welcome'),

  app: function () {
    this.mkdir('app');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {

    var dotfiles = [
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintignore',
      '.jshintrc'
    ];

    dotfiles.forEach(function (dotfile) {
      this.copy(rootDir + dotfile, dotfile);
    }.bind(this));

  }
});

module.exports = StartMeUpGenerator;
