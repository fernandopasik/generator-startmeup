const Base = require('../base');
const typescript = require('./typescript');
const babel = require('./babel');
const flow = require('./flow');
const react = require('./react');
const litHtml = require('./lit-html');
const jest = require('./jest');

module.exports = class extends Base {
  initializing() {
    const currentConfig = this.fs.readJSON(this.destinationPath('.eslintrc.json'));

    this.eslintConfig = {
      extends: [],
      parser: '',
      env: {},
      plugins: [],
      settings: {},
      overrides: [],
      rules: {
        ...((currentConfig && currentConfig.rules) || {}),
      },
    };
  }

  configuring() {
    this.devDependencies.push('eslint');

    typescript.call(this);
    babel.call(this);
    flow.call(this);
    react.call(this);
    litHtml.call(this);
    jest.call(this);

    if (!this.eslintConfig.env.browser) {
      this.eslintConfig.env.node = true;
    }

    Object.keys(this.eslintConfig).forEach((key) => {
      const entry = this.eslintConfig[key];
      if (entry === '' || entry.length === 0 || Object.keys(entry).length === 0) {
        delete this.eslintConfig[key];
      }
    });
  }

  writing() {
    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), this.eslintConfig);
  }

  install() {
    this.yarnInstall(this.devDependencies, { dev: true });
  }
};
