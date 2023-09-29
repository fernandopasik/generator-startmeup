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
      tests:
        this.hasFiles('**/*.test.*') ||
        this.hasFiles('**/*.spec.*') ||
        this.hasFiles('**/__tests__/**'),
    };

    this.renderTemplate('gitignore', '.gitignore', options);
  }
}
