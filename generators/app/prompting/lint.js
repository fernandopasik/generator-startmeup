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
    prompts = {
      type: 'checkbox',
      name: 'lintMethods',
      message: 'Which linting methods would you like to include?',
      default: [ 'eslint' ],
      choices: [
        {
          name: 'eslint',
          checked: true
        }
      ]
    };

  this.prompt(prompts, props => {

    if (-1 !== props.lintMethods.indexOf('eslint')) {
      this.devDependencies = this.devDependencies.concat([
        {
          name: 'eslint',
          version: pkg.devDependencies.eslint
        },
        {
          name: 'eslint-config-fernandopasik',
          version: pkg.devDependencies['eslint-config-fernandopasik']
        }
      ]);

      this.dotfiles.push('.eslintrc', '.eslintignore');
    }

    done();
  });
};
