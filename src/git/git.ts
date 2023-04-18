import Generator from '../generator.js';

export default class GitGenerator extends Generator {
  public writing(): void {
    this.renderTemplate('gitattributes', '.gitattributes');

    const options = {
      package: this.isNpmPackage(),
      packageManager: this.getPackageManager(),
    };

    if (!this.hasFiles('.gitignore')) {
      this.renderTemplate('gitignore', '.gitignore', options);
    }
  }
}
