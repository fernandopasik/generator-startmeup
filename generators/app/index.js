'use strict';

const generator = require('yeoman-generator');

/**
 * Generator definition
 * @param {RunningMethods} All the methods that will be run with the priorities.
 *
 * The available priorities are (in order):
 * 1. initializing - Your initialization methods
 * 									 (checking current project state, getting configs, etc)
 * 2. prompting    - Where you prompt users for options
 * 								   (where you'd call this.prompt())
 * 3. configuring  - Saving configurations and configure the project
 *                   (creating .editorconfig files and other metadata files)
 * 4. default      - If the method name doesn't match a priority,
 *                   it will be pushed to this group.
 * 5. writing      - Where you write the generator specific files
 *                   (routes, controllers, etc)
 * 6. conflicts    - Where conflicts are handled (used internally)
 * 7. install      - Where installation are run (npm, bower)
 * 8. end          - Called last, cleanup, say good bye, etc
 */
module.exports = generator.Base.extend({
  initializing: require('./inc/initializing'),
  prompting: {
    askForName: require('./inc/ask-for-name'),
    lint: require('./inc/lint')
  },
  configuring: {
    dotfiles: require('./inc/dotfiles')
  },
  default: {
    project: require('./inc/project')
  },
  install: require('./inc/install')
});
