import Generator from '../generator';

export default class PrettierGenerator extends Generator {
  public confirmed = true;

  public async prompting(): Promise<void> {
    this.confirmed = await this.confirm('Do you want to use prettier to format files?');
  }

  public async configuring(): Promise<void> {
    if (!this.confirmed) {
      return;
    }

    this.packageJson.merge({
      scripts: {
        format: 'prettier --no-error-on-unmatched-pattern --write ** ./* ./.??*',
      },
    });

    await this.addDevDependencies([
      'prettier',
      'prettier-plugin-organize-imports',
      'prettier-plugin-packagejson',
    ]);

    this.copyTemplate('prettierrc.json', '.prettierrc.json');
    this.copyTemplate('prettierignore', '.prettierignore');
  }
}
