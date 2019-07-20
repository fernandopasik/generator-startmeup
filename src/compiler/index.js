const Generator = require('yeoman-generator');
const babelConfig = require('./babelConfig');
const tsConfig = require('./tsConfig');
const compilerUtils = require('./compiler');

const COMPILERS = ['none', 'babel', 'typescript'];

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
          name: 'compiler',
          message: 'Which compiler do you want to use?',
          choices: COMPILERS,
          default: COMPILERS.indexOf(this.existingCompiler),
        },
      ])),
    };
  }

  configuring() {
    const { compiler } = this.answers;

    if (compiler !== 'none') {
      babelConfig.addPreset('@babel/preset-env');

      if (compiler === 'typescript') {
        babelConfig.addPreset('@babel/preset-typescript');

        this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsConfig);
      }

      this.fs.write('babel.config.js', babelConfig.formatFile());
    }
  }

  install() {
    this.yarnInstall(compilerUtils.getDependencies(this.answers.compiler), { dev: true });
  }
};
