const path = require('path');
const Generator = require('yeoman-generator');
const getApp = require('./app-meta');
const getAuthor = require('./author');
const getGithub = require('./github');

module.exports = class extends Generator {
  async prompting() {
    const app = await getApp.call(this);
    const author = await getAuthor.call(this);
    const github = await getGithub.call(this, app.name);
    const answers = {
      app,
      author,
      github,
      year: new Date().getFullYear(),
    };

    ['package.json', 'LICENSE', 'README.md'].forEach((template) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template),
        answers,
      );
    });

    const rootDir = path.join(__dirname, '../../');

    ['.editorconfig', '.gitattributes', '.gitignore', '.npmignore'].forEach((file) => {
      this.fs.copy(
        `${rootDir}${file}`,
        this.destinationPath(file),
      );
    });
  }
};
