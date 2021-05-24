import Generator from '../generator';

export default class GitGenerator extends Generator {
  public writing(): void {
    this.fs.copy(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'));
    if (!this.fs.exists(this.destinationPath('.gitignore'))) {
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    }
  }
}
