import Generator from 'yeoman-generator';
import { Options } from 'prettier';

import prettifyJson, { AnyJson } from './prettify-json';
import { addDev, getDev, addFromPkg } from '../app/dependencies/index';

export default class PrettierGenerator extends Generator {
  private confirm?: boolean;

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
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
      addDev(['prettier']);
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

      this.fs.write(
        this.destinationPath('.prettierrc.json'),
        prettifyJson(config as AnyJson, config as Options),
      );
    }
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
