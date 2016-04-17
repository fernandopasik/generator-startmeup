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
      default: path.basename(process.cwd())
    },
    {
      name: 'description',
      message: 'What is your app\'s description ?',
      default: ''
    }
  ], props => {
    this.appname = props.appName;
    this.appname = slug(this.appname);
    this.description = props.description;
    done();
  });

};
