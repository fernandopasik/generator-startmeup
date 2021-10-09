import type { PackageJson } from 'type-fest';
import Generator from '../generator';

export default class HooksGenerator extends Generator {
  public async configuring(): Promise<void> {
    const isPrivate = Boolean(this.packageJson.get('private') as PackageJson['private']);

    const scripts: PackageJson['scripts'] = {
      prepare: 'husky install',
    };

    if (!isPrivate) {
      scripts.prepublishOnly = 'pinst --disable';
      scripts.postpublish = 'pinst --enable';
    }

    this.packageJson.merge({ scripts });

    await this.addDevDependencies(['husky']);

    if (!isPrivate) {
      await this.addDevDependencies(['pinst']);
    }

    if (this.hasDevDependency('@commitlint/cli')) {
      this.copyTemplate('commit-msg', '.husky/commit-msg');
    }

    if (this.hasDevDependency('lint-staged')) {
      this.copyTemplate('pre-commit', '.husky/pre-commit');
    }

    this.copyTemplate('pre-push', '.husky/pre-push');

    await this.formatFile('package.json');
  }
}
