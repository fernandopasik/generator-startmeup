import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class GithubActionsGenerator extends Generator {
  public async writing(): Promise<void> {
    if (!this.isNpmPackage()) {
      return;
    }

    const name = (this.packageJson.get('name') as PackageJson['name']) ?? '';
    const scripts = (this.packageJson.get('scripts') as PackageJson['scripts']) ?? {};

    const options = {
      // eslint-disable-next-line no-nested-ternary, @typescript-eslint/no-magic-numbers
      yarn: this.hasFiles('./yarn.lock') ? (this.hasFiles('./.yarn') ? 2 : 1) : 0,
      checkFormat: 'format:check' in scripts,
      jekyll: this.hasFiles('docs/_config.yml') || this.hasFiles('_config.yml'),
      lint: 'lint' in scripts,
      checkTypes: 'check-types' in scripts,
      unitTests: 'test:coverage' in scripts,
      e2eTests: 'test:e2e' in scripts,
      build: 'build' in scripts,
      checkSize: 'size' in scripts,
      name,
    };

    if (options.unitTests || options.e2eTests) {
      await this.addDevDependencies('jest-junit');
    }

    await this.renderTpl('setup.yml', '.github/actions/setup/action.yml', options);
    await this.renderTpl('main.yml', '.github/workflows/main.yml', options);

    if (options.lint || options.unitTests || options.e2eTests) {
      await this.renderTpl('reports.yml', '.github/workflows/reports.yml', options);
    }
  }
}
