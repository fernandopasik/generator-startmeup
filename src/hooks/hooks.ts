import { type PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class HooksGenerator extends Generator {
  public async configuring(): Promise<void> {
    const isPrivate = Boolean(this.packageJson.get('private') as PackageJson['private']);
    const shouldAddPinst = !isPrivate && this.hasFiles('.yarn');

    const scripts: Record<string, string> = {
      prepare: 'husky install',
    };

    if (shouldAddPinst) {
      scripts['prepublishOnly'] = 'pinst --disable';
      scripts['postpublish'] = 'pinst --enable';
    }

    this.packageJson.merge({ scripts });

    await this.addDevDependencies(['husky']);

    if (shouldAddPinst) {
      await this.addDevDependencies(['pinst']);
    }

    const options = {
      yarn: this.hasFiles('./yarn.lock'),
    };

    if (this.hasDevDependency('@commitlint/cli')) {
      await this.renderTpl('commit-msg', '.husky/commit-msg', options);
    }

    if (this.hasDevDependency('lint-staged')) {
      await this.renderTpl('pre-commit', '.husky/pre-commit', options);
    }

    await this.renderTpl('pre-push', '.husky/pre-push', options);

    await this.formatFile('package.json');
  }
}
