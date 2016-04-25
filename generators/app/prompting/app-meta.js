'use strict';

const
  path = require('path'),
  slug = require('slug');

/**
 * Ask for project metadata from the User.
 */
module.exports = function () {

  const done = this.async();

  this.prompt([
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
  ], props => {

    Object.assign(this.pkg, {
      name: slug(props.appName),
      description: props.description
    });

    done();
  });

};
