const path = require('path');

const Base = require('../base');

module.exports = class extends Base {
  async prompting() {
    await this.promptFields();

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
      year: new Date().getFullYear(),
    };

    ['package.json'].forEach((template) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template),
        options,
      );
    });

    ['.editorconfig', '.gitattributes', '.gitignore', '.npmignore'].forEach((file) => {
      this.fs.copy(
        path.join(__dirname, '../../', file),
        this.destinationPath(file),
      );
    });
  }
};
