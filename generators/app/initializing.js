const path = require('path');
const yosay = require('yosay');

/**
 * Start pkg object for npm and bower.
 */
module.exports = function initializing() {
  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

  // Try to load existing package.json
  this.pkg = Object.assign(
    this.fs.readJSON(this.templatePath('_package.json'), {}),
    this.fs.readJSON(this.destinationPath('package.json'), {}),
  );

  this.dotfiles = [];
  this.rootDir = path.join(__dirname, '../../');
};
