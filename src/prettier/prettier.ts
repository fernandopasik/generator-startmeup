import Generator from '../generator';

export default class PrettierGenerator extends Generator {
  public async configuring(): Promise<void> {
    this.packageJson.merge({
      scripts: {
        format: 'prettier --no-error-on-unmatched-pattern --write ** ./* ./.??*',
      },
    });

    const devDependencies = ['prettier', 'prettier-plugin-packagejson'];

    if (this.hasDevDependency('typescript')) {
      devDependencies.push('prettier-plugin-organize-imports');
    }

    await this.addDevDependencies(devDependencies);

    this.copyTemplate('prettierrc.json', '.prettierrc.json');
    this.copyTemplate('prettierignore', '.prettierignore');
  }
}
