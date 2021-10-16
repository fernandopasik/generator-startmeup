import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class PrettierGenerator extends Generator {
  public async configuring(): Promise<void> {
    if (!this.hasFiles('package.json')) {
      return;
    }

    this.packageJson.merge({
      scripts: {
        format: 'prettier --write .',
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
      ruby: this.hasFiles('Gemfile'),
      test: this.hasDevDependency('jest'),
      yarn: this.hasFiles('.yarn'),
    };

    this.copyTemplate('prettierrc.json', '.prettierrc.json');
    this.renderTemplate('prettierignore', '.prettierignore', options);
  }
}
