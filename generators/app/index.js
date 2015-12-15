// jshint es3:false
'use strict';

var generator = require('yeoman-generator');

module.exports = generator.Base.extend({
  init: require('./inc/init'),
  askfor: require('./inc/askfor'),
  project: require('./inc/project'),
  dotfiles: require('./inc/dotfiles'),
  lint: require('./inc/lint')
});
