import Generator from '../generator';

export default class CommitLintGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['@commitlint/cli', '@commitlint/config-conventional']);

    this.copyTemplate('commitlintrc.json', '.commitlintrc.json');
  }
}
