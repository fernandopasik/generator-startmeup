import type { PackageJson } from 'type-fest';
import Generator from '../generator.ts';

export default class GithubActionsGenerator extends Generator {
  public async writing(): Promise<void> {
    if (!this.isNpmPackage()) {
      return;
    }

    const name = (this.packageJson.get('name') as PackageJson['name']) ?? '';
    const isPrivate = (this.packageJson.get('private') as PackageJson['private']) ?? false;
    const scripts = (this.packageJson.get('scripts') as PackageJson['scripts']) ?? {};

    const options = {
      build: 'build' in scripts,
      checkFormat: 'format:check' in scripts,
      checkSize: 'size' in scripts,
      checkTypes: 'check-types' in scripts,
      e2eTests: 'test:e2e' in scripts,
      isPrivate,
      lint: 'lint' in scripts,
      name,
      unitTests: 'test:coverage' in scripts,
      // eslint-disable-next-line no-nested-ternary
      yarn: this.hasFiles('./yarn.lock') ? (this.hasFiles('./.yarn') ? 2 : 1) : 0,
    };

    if (options.unitTests || options.e2eTests) {
      await this.addDevDependencies('jest-junit');
    }

    await this.renderTpl('main.yml', '.github/workflows/main.yml', options);

    if (!isPrivate && (options.lint || options.unitTests || options.e2eTests)) {
      await this.renderTpl('reports.yml', '.github/workflows/reports.yml', options);
    }

    if (isPrivate) {
      this.fs.delete(['.github/workflows/reports.yml']);
    }
  }
}
