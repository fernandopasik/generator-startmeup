'use strict';

const generator = require('yeoman-generator');

module.exports = generator.Base.extend({
  initializing: require('./inc/initializing'),
  askForName: require('./inc/ask-for-name'),
  lint: require('./inc/lint'),
  project: require('./inc/project'),
  dotfiles: require('./inc/dotfiles'),
  install: require('./inc/install')
});
