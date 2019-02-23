/* eslint no-magic-numbers: 0 */
const path = require('path');

/**
 * Copy all the dotfiles for the project.
 * @returns {Promise} After prompting
 */
module.exports = function lint() {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const rootPkg = require(path.join(this.rootDir, 'package.json'));
  const prompts = {
    type: 'checkbox',
    name: 'lintMethods',
    message: 'Which linting methods would you like to include?',
    default: ['eslint'],
    choices: [
      {
        name: 'eslint',
        checked: true,
      },
    ],
  };

  return this.prompt(prompts).then((props) => {
    if (props.lintMethods.indexOf('eslint') !== -1) {
      Object.assign(this.pkg.devDependencies, {
        eslint: rootPkg.devDependencies.eslint,
        'eslint-config-airbnb-base': rootPkg.devDependencies['eslint-config-airbnb-base'],
        'eslint-plugin-import': rootPkg.devDependencies['eslint-plugin-import'],
      });
      this.dotfiles.push('.eslintrc', '.eslintignore');
    }
  });
};
