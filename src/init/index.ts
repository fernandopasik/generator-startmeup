import Generator from 'yeoman-generator';
import path from 'path';

export default class InitGenerator extends Generator {
  public writing(): void {
    ['.editorconfig', '.gitattributes', '.gitignore', '.npmignore'].forEach(
      (file: string): void => {
        this.fs.copy(path.join(__dirname, '../../', file), this.destinationPath(file));
      },
    );
  }
}
