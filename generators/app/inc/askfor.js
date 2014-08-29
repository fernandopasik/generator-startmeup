'use strict';

module.exports = function () {

  var done = this.async();

  this.prompt([
    {
      name: 'appName',
      message: 'What is your app\'s name ?'
    }
  ], function (props) {
    this.appname = props.appName;
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    done();
  }.bind(this));

};
