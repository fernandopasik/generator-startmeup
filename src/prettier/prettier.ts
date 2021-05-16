import Generator from 'yeoman-generator';

interface Answers {
  confirm: boolean;
}

export default class PrettierGenerator extends Generator {
  public answers: Answers = { confirm: true };

  public async prompting(): Promise<void> {
    this.answers = await this.prompt<Answers>([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to use prettier to format files?',
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
    this.packageJson.merge({
      scripts: {
        format: 'prettier --no-error-on-unmatched-pattern --write ** ./* ./.??*',
      },
    });

    // @ts-expect-error not yet in types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.addDevDependencies({
      prettier: '^2.3.0',
      'prettier-plugin-organize-imports': '^2.0.0',
      'prettier-plugin-packagejson': '^2.2.11',
    });

    this.copyTemplate('prettierrc.json', '.prettierrc.json');
    this.copyTemplate('prettierignore', '.prettierignore');
  }
}
