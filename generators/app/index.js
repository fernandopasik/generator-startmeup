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
    sayHi: require('./initializing/say-hi'),
    package: require('./initializing/package')
  },

  /**
   * Where you prompt users for options
   * (where you'd call this.prompt())
   */
  prompting: {
    appMeta: require('./prompting/app-meta'),
    author: require('./prompting/author'),
    github: require('./prompting/github'),
    lint: require('./prompting/lint')
  },

  /**
   * Saving configurations and configure the project
   * (creating .editorconfig files and other metadata files)
   */
  configuring: require('./configuring'),

  /**
   * If the method name doesn't match a priority,
   * it will be pushed to this group.
   */
  default: {
    project: require('./project')
  },

  /**
   * Where installation are run (npm, bower)
   */
  install: require('./install')
});
