import Generator from '../generator.js';

export default class CommitLintGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['@commitlint/cli', '@commitlint/config-conventional']);

    await this.renderTpl('commitlintrc.json', '.commitlintrc.json');
  }
}
