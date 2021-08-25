import type { PackageJson } from 'type-fest';
import Generator from '../generator';

export default class PrettierGenerator extends Generator {
  public async configuring(): Promise<void> {
    this.packageJson.merge({
      scripts: {
        format: 'prettier --write .',
      },
    });

    const devDependencies = ['prettier', 'prettier-plugin-pkg'];

    if (this.hasDevDependency('typescript')) {
      devDependencies.push('prettier-plugin-organize-imports');
    }

    await this.addDevDependencies(devDependencies);
  }

  public writing(): void {
    const packageFiles = (this.packageJson.get('files') as PackageJson['files']) ?? [];

    const options = {
      files: packageFiles.map((packageFile) => `${packageFile}\n`).join(''),
      flow: this.hasDevDependency('flow-bin'),
      jekyll: this.hasFiles('docs/_config.yml') || this.hasFiles('_config.yml'),
      ruby: this.hasFiles('Gemfile'),
      test: this.hasDevDependency('jest'),
    };

    this.copyTemplate('prettierrc.json', '.prettierrc.json');
    this.renderTemplate('prettierignore', '.prettierignore', options);
  }
}
