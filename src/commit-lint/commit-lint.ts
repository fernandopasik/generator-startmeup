import Generator from '../generator';

export default class CommitLintGenerator extends Generator {
  public confirmed = true;

  public async prompting(): Promise<void> {
    this.confirmed = await this.confirm(
      'Do you want to use commit lint with conventional commits format?',
    );
  }

  public async configuring(): Promise<void> {
    if (!this.confirmed) {
      return;
    }

    await this.addDevDependencies(['@commitlint/cli', '@commitlint/config-conventional']);

    this.copyTemplate('commitlintrc.json', '.commitlintrc.json');
  }
}
