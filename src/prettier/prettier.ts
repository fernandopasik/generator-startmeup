import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class PrettierGenerator extends Generator {
  public async configuring(): Promise<void> {
    if (!this.isNpmPackage()) {
      return;
    }

    this.packageJson.merge({
      scripts: {
        format: 'prettier --write .',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'format:check': 'prettier --check .',
      },
    });

    const devDependencies = ['prettier', 'prettier-plugin-pkg', 'prettier-plugin-sh'];

    if (this.hasAnyDependency('typescript')) {
      devDependencies.push('prettier-plugin-organize-imports');
    }

    await this.addDevDependencies(devDependencies);
  }

  public writing(): void {
    const packageFiles = (this.packageJson.get('files') as PackageJson['files']) ?? [];

    const options = {
      files: packageFiles.map((packageFile) => `${packageFile}\n`).join(''),
      flow: this.hasDevDependency('flow-bin'),
      husky: this.hasFiles('.husky'),
      jekyll: this.hasFiles('docs/_config.yml') || this.hasFiles('_config.yml'),
      test: this.hasDevDependency('jest'),
      yarn: this.hasFiles('.yarn'),
    };

    this.copyTemplate('prettierrc.json', '.prettierrc.json');
    this.renderTemplate('prettierignore', '.prettierignore', options);
  }
}
