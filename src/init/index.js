const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  writing() {
    ['.editorconfig', '.gitattributes', '.gitignore', '.npmignore'].forEach(file => {
      this.fs.copy(path.join(__dirname, '../../', file), this.destinationPath(file));
    });
  }
};
