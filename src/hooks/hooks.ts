import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';

export default class HooksGenerator extends Generator {
  public async configuring(): Promise<void> {
    this.packageJson.merge({
      scripts: {
        postinstall: 'husky install',
        prepublishOnly: 'pinst --disable',
        postpublish: 'pinst --enable',
      },
    });

    await this.addDevDependencies({ husky: '^6.0.0', pinst: '^2.1.6' });

    const devDependencies = this.packageJson.get('devDependencies') as PackageJson;

    if ('@commitlint/cli' in devDependencies) {
      this.copyTemplate('commit-msg', '.husky/commit-msg');
    }

    if ('lint-staged' in devDependencies) {
      this.copyTemplate('pre-commit', '.husky/pre-commit');
    }

    this.copyTemplate('pre-push', '.husky/pre-push');
  }
}
