const Generator = require('yeoman-generator');
const path = require('path');

const info = require('../app/info.js');

module.exports = class extends Generator {
  async prompting() {
    await info.ask([
      'appName',
      'appDescription',
      'authorName',
      'authorEmail',
      'authorUrl',
      'githubConfirm',
      'githubUsername',
      'githubRepo',
    ]);
  }

  writing() {
    const {
      authorName,
      authorEmail,
      authorUrl,
      githubRepo,
    } = info.answers;

    const options = {
      ...info.answers,
      author: [
        authorName,
        !authorEmail ? '' : ` <${authorEmail}>`,
        !authorUrl ? '' : ` (${authorUrl})`,
      ].join(''),
      github: githubRepo ? {
        homepage: githubRepo,
        bugs: `${githubRepo}/issues`,
        url: `${githubRepo}.git`,
      } : {},
    };

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      options,
    );

    ['.editorconfig', '.gitattributes', '.gitignore', '.npmignore'].forEach((file) => {
      this.fs.copy(
        path.join(__dirname, '../../', file),
        this.destinationPath(file),
      );
    });
  }
};
