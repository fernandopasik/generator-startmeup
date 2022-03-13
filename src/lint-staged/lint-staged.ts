import Generator from '../generator.js';

export default class LintStagedGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['lint-staged']);
  }

  public async writing(): Promise<void> {
    const getExtensionsTarget = (extensions: readonly string[]): string | undefined =>
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
      module: this.packageJson.get('type') === 'module',
      prettier: this.hasAnyDependency('prettier'),
      scss: this.hasFiles('**/*.scss'),
      stylelint: this.hasDevDependency('stylelint'),
      typescript: this.hasAnyDependency('typescript'),
    };

    if (options.typescript && typeof this.packageJson.get('workspaces') !== 'undefined') {
      await this.renderTpl(
        'lintstagedrc.js',
        options.module ? '.lintstagedrc.js' : '.lintstagedrc.cjs',
        options,
      );
      this.fs.delete('.lintstagedrc.json');
    } else {
      await this.renderTpl('lintstagedrc.json', '.lintstagedrc.json', options);
      this.fs.delete(['.lintstagedrc.js', '.lintstagedrc.cjs']);
    }
  }
}
