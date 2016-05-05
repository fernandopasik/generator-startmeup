/* eslint no-magic-numbers: 0 */
'use strict';

/**
 * Copy all the dotfiles for the project.
 * @returns {Promise} After prompting
 */
module.exports = function () {

  const
    path = require('path'),
    rootPkg = require(path.join(this.rootDir, 'package.json')),
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

  return this.prompt(prompts).then(props => {

    if (-1 !== props.lintMethods.indexOf('eslint')) {
      Object.assign(this.pkg.devDependencies, {
        eslint: rootPkg.devDependencies.eslint,
        'eslint-config-fernandopasik':
          rootPkg.devDependencies['eslint-config-fernandopasik']
      });
      this.dotfiles.push('.eslintrc', '.eslintignore');
    }
  });
};
