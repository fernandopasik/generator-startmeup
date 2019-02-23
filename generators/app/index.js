/* eslint-disable global-require */
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
  initializing: require('./initializing'),

  /**
   * Where you prompt users for options
   * (where you'd call this.prompt())
   */
  prompting: {
    appMeta: require('./prompting/app-meta'),
    author: require('./prompting/author'),
    github: require('./prompting/github'),
    lint: require('./prompting/lint'),
    bower: require('./prompting/bower'),
  },

  /**
   * Saving configurations and configure the project
   * (creating .editorconfig files and other metadata files)
   */
  configuring: require('./configuring'),

  /**
   * Where you write the generator specific files
   * (routes, controllers, etc)
   */
  writing: require('./writing'),

  /**
   * Where installation are run (npm, bower)
   */
  install: require('./install'),
});
