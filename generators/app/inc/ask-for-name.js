'use strict';

const
  path = require('path'),
  _s = require('underscore.string');

/**
 * Ask for project data from the User.
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
    this.appname = _s.camelize(_s.slugify(_s.humanize(this.appname)));
    this.description = props.description;
    done();
  });

};
