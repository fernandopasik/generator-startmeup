import Generator from '../generator';

export default class GitGenerator extends Generator {
  public writing(): void {
    this.renderTemplate('gitattributes', '.gitattributes');

    const options = {
      package: this.hasFiles('package.json'),
    };

    if (!this.fs.exists(this.destinationPath('.gitignore'))) {
      this.renderTemplate('gitignore', '.gitignore', options);
    }
  }
}
