// jshint es3:false
'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  init: require('./inc/init'),
  welcome: require('./inc/welcome'),
  project: require('./inc/project'),
  dotfiles: require('./inc/dotfiles')
});
