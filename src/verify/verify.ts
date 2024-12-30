import type { PackageJson } from 'type-fest';
import Generator from '../generator.ts';

export default class VerifyGenerator extends Generator {
  public async configuring(): Promise<void> {
    const steps = [
      'format:check',
      'lint',
      'lit-analyze',
      'check-types',
      'test:coverage',
      'build',
      'size',
    ];

    const scripts = (this.packageJson.get('scripts') as PackageJson['scripts']) ?? {};

    const existing = steps.filter((step) => step in scripts);
    const runner = this.hasFiles('./yarn.lock') ? 'yarn' : 'npm run';

    const verify = existing.map((step) => `${runner} ${step}`).join(' && ');

    this.packageJson.setPath('scripts.verify', verify);

    await this.formatFile('package.json');
  }
}
