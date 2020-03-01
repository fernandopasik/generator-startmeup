import Generator from 'yeoman-generator';
import path from 'path';

export default class InitGenerator extends Generator {
  public writing(): void {
    const getSrcPath = (filename: string): string => path.join(__dirname, '../../', filename);

    this.fs.copy(getSrcPath('.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(getSrcPath('.gitattributes'), this.destinationPath('.gitattributes'));
    if (!this.fs.exists(getSrcPath('.gitignore'))) {
      this.fs.copy(getSrcPath('.gitignore'), this.destinationPath('.gitignore'));
    }
  }
}
