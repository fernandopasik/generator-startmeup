import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class PrettierGenerator extends Generator {
  private plugins: string[] = [];

  public async configuring(): Promise<void> {
    if (!this.isNpmPackage()) {
      return;
    }

    this.packageJson.merge({
      scripts: {
        format: 'prettier --write .',
        'format:check': 'prettier --check .',
      },
    });

    this.plugins.push('prettier-plugin-pkg', 'prettier-plugin-sh');

    if (this.hasAnyDependency('typescript')) {
      this.plugins.push('prettier-plugin-organize-imports');
    }

    await this.addDevDependencies(['prettier', ...this.plugins]);
  }

  public writing(): void {
    const packageFiles = (this.packageJson.get('files') as PackageJson['files']) ?? [];

    const ignoreOptions = {
      ansible: this.hasFiles('ansible.cfg'),
      files: packageFiles.map((packageFile) => `${packageFile}\n`).join(''),
      flow: this.hasDevDependency('flow-bin'),
      husky: this.hasFiles('.husky'),
      jekyll: this.hasFiles('docs/_config.yml') || this.hasFiles('_config.yml'),
      test: this.hasDevDependency('jest'),
      yarn: this.hasFiles('.yarn'),
    };

    const configOptions = {
      plugins: this.plugins
        .sort()
        .map((plugin) => `"${plugin}"`)
        .join(','),
    };

    this.renderTpl('prettierrc.json', '.prettierrc.json', configOptions);
    this.renderTpl('prettierignore', '.prettierignore', ignoreOptions);
  }
}
