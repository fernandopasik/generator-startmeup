import Generator from '../generator';

export default class LintStagedGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['lint-staged']);
  }

  public async writing(): Promise<void> {
    const options = {
      cssExtensions: this.getExtensions('css').join(','),
      eslint: this.hasDevDependency('eslint'),
      jest: this.hasDevDependency('jest'),
      jsExtensions: this.getExtensions().join(','),
      prettier: this.hasDevDependency('prettier'),
      scss: this.hasFiles('**/*.scss'),
    };

    this.renderTemplate('lintstagedrc.json', '.lintstagedrc.json', options);

    await this.formatFile('.lintstagedrc.json');
  }
}
