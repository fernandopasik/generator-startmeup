import Generator from '../generator.ts';

export default class GitGenerator extends Generator {
  public async writing(): Promise<void> {
    await this.renderTpl('gitattributes', '.gitattributes');
    const existingGitIgnore = this.fs.read('.gitignore');
    const restGitIgnore = existingGitIgnore
      ?.replace(/[\S\s]*# build and temp folders\n/mu, '')
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

    await this.renderTpl('gitignore', '.gitignore', options);
  }
}
