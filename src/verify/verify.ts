import type { PackageJson } from 'type-fest';
import Generator from '../generator';

export default class VerifyGenerator extends Generator {
  public async configuring(): Promise<void> {
    const steps = ['lint', 'lit-analyze', 'check-types', 'test:coverage', 'build', 'size'];
    const scripts = (this.packageJson.get('scripts') as PackageJson['scripts']) ?? {};

    const existing = steps.filter((step) => scripts[step]);

    const verify = existing.map((step) => `yarn ${step}`).join(' && ');

    this.packageJson.setPath('scripts.verify', verify);

    await this.formatFile('package.json');
  }
}
