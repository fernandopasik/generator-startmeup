import Generator from 'yeoman-generator';

interface Answers {
  confirm: boolean;
}

export default class CommitLintGenerator extends Generator {
  public answers: Answers = { confirm: true };

  public async prompting(): Promise<void> {
    this.answers = await this.prompt<Answers>([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to use commit lint with conventional commits format?',
        default: true,
      },
    ]);
  }

  public configuring(): void {
    if (!this.answers.confirm) {
      return;
    }

    // @ts-expect-error not yet in types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.addDevDependencies({
      '@commitlint/cli': '^12.0.1',
      '@commitlint/config-conventional': '^12.0.1',
    });

    this.copyTemplate('commitlintrc.json', '.commitlintrc.json');
  }
}
