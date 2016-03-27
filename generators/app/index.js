'use strict';

const generator = require('yeoman-generator');

module.exports = generator.Base.extend({
  init: require('./inc/init'),
  askForName: require('./inc/ask-for-name'),
  askForModules: require('./inc/ask-for-modules'),
  project: require('./inc/project'),
  dotfiles: require('./inc/dotfiles'),
  lint: require('./inc/lint')
});
