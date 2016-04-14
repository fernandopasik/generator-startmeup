/* eslint no-magic-numbers: 0 */
'use strict';

const
  path = require('path'),
  rootDir = path.join(__dirname, '../../../');

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  const
    done = this.async(),
    lintMethods = {
      jshint: {
        dotfiles: [ '.jshintrc', '.jshintignore' ]
      },
      jscs: {
        dotfiles: [ '.jscsrc' ]
      },
      eslint: {
        dependencies: [ 'eslint-config-fernandopasik' ],
        dotfiles: [ '.eslintrc' ]
      }
    },
    defaultLintMethods = [ 'eslint' ],
    prompts = {
      type: 'checkbox',
      name: 'lintMethods',
      message: 'Which linting methods would you like to include?',
      default: defaultLintMethods,
      choices: Object.keys(lintMethods).map(lintMethod => ({
        name: lintMethod,
        checked: -1 !== defaultLintMethods.indexOf(lintMethod)
      }))
    };

  this.prompt(prompts, props => {

    // Init modules for later installing dependencies
    this.modules = this.modules || [];

    // Iterate through the selected linting methods
    props.lintMethods.forEach(lintMethod => {

      // Add the linting dependency
      this.modules.push(lintMethod);

      // Add its dependencies if available
      if (lintMethods[lintMethod].dependencies) {
        this.modules = this.modules.concat(lintMethods[lintMethod].dependencies);
      }

      // Copy the dotfiles corresponding to the linting modules
      lintMethods[lintMethod].dotfiles.forEach(dotfile => {
        this.copy(rootDir + dotfile, dotfile);
      });
    });

    done();
  });
};
