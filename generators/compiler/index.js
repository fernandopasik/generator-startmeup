const Generator = require('yeoman-generator');
const babelConfig = require('./babelConfig');
const tsConfig = require('./tsConfig');

const COMPILERS = ['none', 'babel', 'typescript'];

module.exports = class extends Generator {
  initializing() {
    const { devDependencies } = this.fs.readJSON('package.json') || {};

    this.existingCompiler = 'none';

    if (!devDependencies) {
      return;
    }

    if (devDependencies['@babel/core']) {
      this.existingCompiler = 'babel';
    }

    if (devDependencies.typescript) {
      this.existingCompiler = 'typescript';
    }
  }

  async prompting() {
    this.answers = {
      ...await this.prompt([
        {
          type: 'list',
          name: 'compiler',
          message: 'Which compiler do you want to use?',
          choices: COMPILERS,
          default: COMPILERS.indexOf(this.existingCompiler),
        },
      ]),
    };
  }

  configuring() {
    const { compiler } = this.answers;
    this.dependencies = [];

    if (compiler !== 'none') {
      this.dependencies.push('@babel/cli', '@babel/core', '@babel/preset-env');
      babelConfig.addPreset('@babel/preset-env');

      if (compiler === 'typescript') {
        this.dependencies.push('typescript', '@babel/preset-typescript');
        babelConfig.addPreset('@babel/preset-typescript');

        this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsConfig);
      }

      this.fs.write('babel.config.js', babelConfig.formatFile());
    }
  }

  install() {
    this.yarnInstall(this.dependencies, { dev: true });
  }
};
