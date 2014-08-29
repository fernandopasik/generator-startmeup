// jshint es3:false
'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  init: require('./inc/init'),
  welcome: require('./inc/welcome'),
  askfor: require('./inc/askfor'),
  project: require('./inc/project'),
  dotfiles: require('./inc/dotfiles')
});
