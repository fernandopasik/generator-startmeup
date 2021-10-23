import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class GithubActionsGenerator extends Generator {
  public async writing(): Promise<void> {
    if (!this.hasFiles('package.json')) {
      return;
    }

    const scripts = (this.packageJson.get('scripts') as PackageJson['scripts']) ?? {};

    const options = {
      yarn: this.hasFiles('./yarn.lock'),
      checkFormat: 'format:check' in scripts,
      lint: 'lint' in scripts,
      checkTypes: 'check-types' in scripts,
      unitTests: 'test:coverage' in scripts,
      e2eTests: 'test:e2e' in scripts,
      build: 'build' in scripts,
      checkSize: 'size' in scripts,
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
