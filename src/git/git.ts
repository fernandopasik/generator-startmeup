import Generator from '../generator.js';

export default class GitGenerator extends Generator {
  public writing(): void {
    this.renderTemplate('gitattributes', '.gitattributes');

    const options = {
      package: this.isNpmPackage(),
      packageManager: this.getPackageManager(),
    };

    this.renderTemplate('gitignore', '.gitignore', options);
  }
}
