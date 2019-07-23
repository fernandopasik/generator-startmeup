const Generator = require('yeoman-generator');

const dependencies = require('../app/dependencies');
const compilerUtils = require('../compiler/compiler');
const configReact = require('./react');

module.exports = class extends Generator {
  initializing() {
    const pkg = this.fs.readJSON('package.json');
    this.existingCompiler = compilerUtils.detect(pkg);
  }

  async prompting() {
    this.answers = {
      ...(await this.prompt([
        {
          type: 'list',
          name: 'uiLibrary',
          message: 'Which UI library do you want to use?',
          choices: ['none', 'react', 'lit-html'],
          default: 0,
        },
      ])),
    };
  }

  configuring() {
    const { uiLibrary } = this.answers;

    if (uiLibrary === 'lit-html') {
      dependencies.add(['lit-html', 'lit-element']);
    }

    if (uiLibrary === 'react') {
      configReact.call(this, this.existingCompiler);
    }
  }

  install() {
    this.yarnInstall(dependencies.get());
    this.yarnInstall(dependencies.getDev(), { dev: true });
  }
};
