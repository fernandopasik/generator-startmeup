import Generator from 'yeoman-generator';

export default class InitGenerator extends Generator {
  public writing(): void {
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'));
    if (!this.fs.exists(this.destinationPath('.gitignore'))) {
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    }
  }
}
