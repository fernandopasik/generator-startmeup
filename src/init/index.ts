import Generator from 'yeoman-generator';
import path from 'path';

export default class InitGenerator extends Generator {
  writing() {
    ['.editorconfig', '.gitattributes', '.gitignore', '.npmignore'].forEach(file => {
      this.fs.copy(path.join(__dirname, '../../', file), this.destinationPath(file));
    });
  }
}
