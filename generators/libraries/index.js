const Base = require('../base');
const configReact = require('./react');
const setupSrc = require('./setup-src');
const setupTypescript = require('./setup-typescript');

module.exports = class extends Base {
  async prompting() {
    this.answers = {
      ...this.answers,
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

      this.devDependencies.push('@babel/cli', '@babel/core', '@babel/preset-env');

      if (flow) {
        this.devDependencies.push('@babel/preset-flow', 'flow-bin');
        this.babelConfig.presets.push('@babel/preset-flow');
      }
    }

    if (compiler === 'typescript') {
      this.devDependencies.push('typescript');
    }

    if (uiLibrary === 'lit-html') {
      this.dependencies.push('lit-html', 'lit-element');
    }

    configReact.call(this, this.answers.compiler);
  }

  writing() {
    const { compiler, uiLibrary } = this.answers;

    if (compiler === 'babel') {
      this.fs.write(
        this.destinationPath('babel.config.js'),
        this.formatJsConfig(this.babelConfig),
      );
    }

    if (compiler === 'typescript') {
      setupTypescript.call(this);
    }

    setupSrc.call(this, compiler === 'typescript', uiLibrary === 'react');
  }

  install() {
    this.yarnInstall(this.dependencies);
    this.yarnInstall(this.devDependencies, { dev: true });
  }
};
