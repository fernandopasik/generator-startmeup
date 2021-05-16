import Generator from '../generator';

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

    if (this.hasDevDependency('@commitlint/cli')) {
      this.copyTemplate('commit-msg', '.husky/commit-msg');
    }

    if (this.hasDevDependency('lint-staged')) {
      this.copyTemplate('pre-commit', '.husky/pre-commit');
    }

    this.copyTemplate('pre-push', '.husky/pre-push');
  }
}
