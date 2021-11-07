import Generator from '../generator.js';

export default class LintStagedGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['lint-staged']);
  }

  public async writing(): Promise<void> {
    const getExtensionsTarget = (extensions: readonly string[]): string | undefined =>
      // eslint-disable-next-line no-nested-ternary
      extensions.length !== 0
        ? extensions.length > 1
          ? `*.{${extensions.join(',')}}`
          : `*.${extensions[0]}`
        : undefined;

    const options = {
      cssTarget: getExtensionsTarget(this.getExtensions('css')),
      eslint: this.hasDevDependency('eslint'),
      jest: this.hasDevDependency('jest'),
      jsTarget: getExtensionsTarget(this.getExtensions()),
      prettier: this.hasAnyDependency('prettier'),
      scss: this.hasFiles('**/*.scss'),
      stylelint: this.hasDevDependency('stylelint'),
      typescript: this.hasAnyDependency('typescript'),
    };

    await this.renderTpl('lintstagedrc.cjs', '.lintstagedrc.cjs', options);
  }
}
