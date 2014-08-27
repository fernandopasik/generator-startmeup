// jshint es3:false
'use strict';

var
  yeoman = require('yeoman-generator'),
  StartMeUpGenerator;

StartMeUpGenerator = yeoman.generators.Base.extend({

  init: function () {

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

  dotfiles: require('./inc/dotfiles')
});

module.exports = StartMeUpGenerator;
