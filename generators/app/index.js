'use strict';

const generator = require('yeoman-generator');

/**
 * Generator definition
 * @param {RunningMethods} All the methods that will be run with the priorities.
 */
module.exports = generator.Base.extend({

  /**
   * Your initialization methods
   * (checking current project state, getting configs, etc)
   */
  initializing: {
    sayHi: require('./inc/say-hi')
  },

  /**
   * Where you prompt users for options
   * (where you'd call this.prompt())
   */
  prompting: {
    askForAppMeta: require('./inc/ask-for-app-meta'),
    askForGithub: require('./inc/ask-for-github'),
    lint: require('./inc/lint')
  },

  /**
   * Saving configurations and configure the project
   * (creating .editorconfig files and other metadata files)
   */
  configuring: {
    dotfiles: require('./inc/dotfiles')
  },

  /**
   * If the method name doesn't match a priority,
   * it will be pushed to this group.
   */
  default: {
    project: require('./inc/project')
  },

  /**
   * Where installation are run (npm, bower)
   */
  install: require('./inc/install')
});
