import Generator from 'yeoman-generator';

import { dependencies, configs } from '../core';

export default class PrettierGenerator extends Generator {
  private confirm: boolean = true;

  public initializing(): void {
    dependencies.importFrom(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    const { confirm } = await this.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        default: true,
        message: 'Do you want to use prettier to format files?',
      },
    ]);
    this.confirm = confirm;
  }

  public configuring(): void {
    if (this.confirm) {
      dependencies.add('prettier', 'devDependencies');
    }
  }

  public async writing(): Promise<void> {
    if (this.confirm) {
      const config = {
        arrowParens: 'always',
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'all',
      };

      await configs.save('.prettierrc.json', config);
    }
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
