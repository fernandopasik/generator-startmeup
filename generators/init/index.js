const path = require('path');

const Base = require('../base');

module.exports = class extends Base {
  async prompting() {
    await this.promptFields();
  }

  writing() {
    const {
      authorName,
      authorEmail,
      authorUrl,
      githubRepo,
    } = this.answers;

    const options = {
      ...this.answers,
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
