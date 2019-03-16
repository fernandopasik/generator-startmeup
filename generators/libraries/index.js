const Base = require('../base');
const setupSrc = require('./setup-src');

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
    if (this.answers.compiler === 'babel') {
      this.babelConfig = {
        presets: ['@babel/preset-env'],
      };

      this.devDependencies.push('@babel/cli', '@babel/core', '@babel/preset-env');

      if (this.answers.uiLibrary === 'react') {
        this.devDependencies.push('@babel/preset-react');
        this.babelConfig.presets.push('@babel/preset-react');
      }

      if (this.answers.flow) {
        this.devDependencies.push('@babel/preset-flow', 'flow-bin');
        this.babelConfig.presets.push('@babel/preset-flow');
      }
    }

    if (this.answers.compiler === 'typescript') {
      this.devDependencies.push('typescript');
    }

    if (this.answers.uiLibrary === 'react') {
      this.dependencies.push('react', 'react-dom');
      this.devDependencies.push('react-test-renderer');
    }

    if (this.answers.uiLibrary === 'lit-html') {
      this.dependencies.push('lit-html', 'lit-element');
    }
  }

  writing() {
    const { compiler, uiLibrary } = this.answers;

    if (compiler === 'babel') {
      this.fs.write(
        this.destinationPath('babel.config.js'),
        this.formatJsConfig(this.babelConfig),
      );
    }

    if (this.answers.compiler === 'typescript') {
      const config = {
        compilerOptions: {
          declaration: true,
          declarationMap: true,
          esModuleInterop: true,
          experimentalDecorators: true,
          inlineSources: true,
          lib: ['es2017', 'dom'],
          module: 'es2015',
          moduleResolution: 'node',
          noFallthroughCasesInSwitch: true,
          noImplicitAny: false,
          noImplicitReturns: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          outDir: 'dist',
          rootDir: 'src',
          skipLibCheck: true,
          sourceMap: true,
          strict: true,
          target: 'es2017',
        },
        include: [
          'src/*.ts',
        ],
        exclude: [
          'node_modules',
          '**/__tests__/**/*.(js|ts)?(x)',
          '**/?(*.)+(spec|test).(js|ts)?(x)',
        ],
      };

      this.fs.writeJSON(this.destinationPath('tsconfig.json'), config);
    }

    setupSrc.call(this, compiler === 'typescript', uiLibrary === 'react');
  }

  install() {
    this.yarnInstall(this.dependencies);
    this.yarnInstall(this.devDependencies, { dev: true });
  }
};
