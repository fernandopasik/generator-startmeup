'use strict';

const
  path = require('path');

/**
 * Ask for project metadata from the User.
 * @returns {Promise} After prompting
 */
module.exports = function () {

  return this.prompt([
    {
      name: 'appName',
      message: 'What is your app\'s name ?',
      default: this.pkg.name || path.basename(process.cwd())
    },
    {
      name: 'description',
      message: 'What is your app\'s description ?',
      default: this.pkg.description
    }
  ]).then(props => {

    const appName = props.appName
      .toString()
      .trim()
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/([^a-zA-Z0-9._-]+)/, '');

    Object.assign(this.pkg, {
      name: appName,
      description: props.description
    });
  });

};
