// jshint es3:false
'use strict';

var
  path = require('path'),
  _s = require('underscore.string');

/**
 * AskFor will get initial options from the User.
 */
module.exports = function () {

  var done = this.async();

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
  ], function (props) {
    this.appname = props.appName;
    this.appname = _s.camelize(_s.slugify(_s.humanize(this.appname)));
    this.description = props.description;
    done();
  }.bind(this));

};
