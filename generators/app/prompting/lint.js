/* eslint no-magic-numbers: 0 */
'use strict';

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  const
    done = this.async(),
    path = require('path'),
    pkg = require(path.join(this.rootDir, 'package.json')),
    lintMethods = {
      jshint: {
        dotfiles: [ '.jshintrc', '.jshintignore' ]
      },
      jscs: {
        dotfiles: [ '.jscsrc' ]
      },
      eslint: {
        dependencies: [ 'eslint-config-fernandopasik' ],
        dotfiles: [ '.eslintrc', '.eslintignore' ]
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

    // Iterate through the selected linting methods
    props.lintMethods.forEach(lintMethod => {

      // Add the linting dependency
      this.devDependencies.push({
        name: lintMethod,
        version: pkg.devDependencies[lintMethod]
      });

      // Add its dependencies if available
      if (lintMethods[lintMethod].dependencies) {
        lintMethods[lintMethod].dependencies.forEach(dependency => {
          this.devDependencies.push({
            name: dependency,
            version: pkg.devDependencies[dependency]
          });
        });
      }

      // Copy the dotfiles corresponding to the linting modules
      lintMethods[lintMethod].dotfiles.forEach(dotfile => {
        this.copy(this.rootDir + dotfile, dotfile);
      });
    });

    done();
  });
};
