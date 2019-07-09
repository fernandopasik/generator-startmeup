const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    const subGenerators = ['init', 'package.json', 'libraries', 'test', 'lint', 'hooks', 'docs'];

    subGenerators.forEach((subGenerator) => {
      this.composeWith(require.resolve(`../${subGenerator}`));
    });
  }
};
