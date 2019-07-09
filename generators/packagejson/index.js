const Generator = require('yeoman-generator');
const sort = require('sort-package-json');

const info = require('../app/info.js');
const parse = require('./parse');
const compose = require('./compose');

module.exports = class extends Generator {
  initializing() {
    this.pkg = this.fs.readJSON('package.json') || {};
    this.parameters = parse(this.pkg);
  }

  async prompting() {
    const questions = [
      'appName',
      'appDescription',
      'authorName',
      'authorEmail',
      'authorUrl',
      'githubConfirm',
      'githubUsername',
      'githubUrl',
    ];

    await info.ask(questions, this.parameters);
  }

  writing() {
    const pkg = {
      ...this.pkg,
      ...compose(info.answers),
    };

    const sortedPkg = sort(pkg);

    this.fs.writeJSON('package.json', sortedPkg);
  }
};
