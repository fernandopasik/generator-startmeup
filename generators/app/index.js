const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  main() {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    this.composeWith(require.resolve('../init'));
  }
};
