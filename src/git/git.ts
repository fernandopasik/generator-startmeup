import Generator from '../generator.js';

export default class GitGenerator extends Generator {
  public writing(): void {
    this.renderTemplate('gitattributes', '.gitattributes');
    const existingGitIgnore = this.fs.read('.gitignore');
    const restGitIgnore = existingGitIgnore
      .replace(/[\S\s]*# build and temp folders\n/m, '')
      .trim();

    const options = {
      package: this.isNpmPackage(),
      packageManager: this.getPackageManager(),
      restGitIgnore,
    };

    this.renderTemplate('gitignore', '.gitignore', options);
  }
}
