import Generator from '../generator';

export default class GitGenerator extends Generator {
  public writing(): void {
    this.renderTemplate('gitattributes', '.gitattributes');

    const options = {
      package: this.hasFiles('package.json'),
    };

    if (!this.hasFiles('.gitignore')) {
      this.renderTemplate('gitignore', '.gitignore', options);
    }
  }
}
