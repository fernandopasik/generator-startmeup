import Generator from '../generator';

export default class PrettierGenerator extends Generator {
  public confirmed = true;

  public async prompting(): Promise<void> {
    this.confirmed = await this.confirm('Do you want to use prettier to format files?');
  }

  public configuring(): void {
    if (!this.confirmed) {
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
