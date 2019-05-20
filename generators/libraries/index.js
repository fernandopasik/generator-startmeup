const Generator = require('yeoman-generator');

const dependencies = require('../app/dependencies');
const util = require('../app/util');
const configReact = require('./react');
const setupSrc = require('./setup-src');
const setupTypescript = require('./setup-typescript');

module.exports = class extends Generator {
  async prompting() {
    this.answers = {
      ...await this.prompt([
        {
          type: 'list',
          name: 'compiler',
          message: 'Which compiler do you want to use?',
          choices: ['none', 'babel', 'typescript'],
          default: 1,
        },
        {
          type: 'confirm',
          name: 'flow',
          message: 'Do you want to use flow static type checking?',
          default: false,
          when: props => props.compiler === 'babel',
        },
        {
          type: 'list',
          name: 'uiLibrary',
          message: 'Which UI library do you want to use?',
          choices: ['none', 'react', 'lit-html'],
          default: 0,
        },
      ]),
    };
  }

  configuring() {
    const { compiler, flow, uiLibrary } = this.answers;

    if (compiler === 'babel') {
      this.babelConfig = {
        presets: ['@babel/preset-env'],
      };

      dependencies.addDev(['@babel/cli', '@babel/core', '@babel/preset-env']);

      if (flow) {
        dependencies.addDev(['@babel/preset-flow', 'flow-bin']);
        this.babelConfig.presets.push('@babel/preset-flow');
      }
    }

    if (compiler === 'typescript') {
      dependencies.addDev(['typescript']);
    }

    if (uiLibrary === 'lit-html') {
      dependencies.add(['lit-html', 'lit-element']);
    }

    if (uiLibrary === 'react') {
      configReact.call(this, this.answers.compiler);
    }
  }

  writing() {
    const { compiler, uiLibrary } = this.answers;

    if (compiler === 'babel') {
      this.fs.write(
        this.destinationPath('babel.config.js'),
        util.formatJsConfig(this.babelConfig),
      );
    }

    if (compiler === 'typescript') {
      setupTypescript.call(this);
    }

    setupSrc.call(this, compiler === 'typescript', uiLibrary === 'react');
  }

  install() {
    this.yarnInstall(dependencies.get());
    this.yarnInstall(dependencies.getDev(), { dev: true });
  }
};
