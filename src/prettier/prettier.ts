import Generator from 'yeoman-generator';

import { ask, dependencies, configs, modules } from '../core';
import config from './config';

export default class PrettierGenerator extends Generator {
  private confirm: boolean = true;

  public async initializing(): Promise<void> {
    await dependencies.importAll();
    modules.load('prettier', config);
  }

  public async prompting(): Promise<void> {
    const { prettier } = await ask([
      {
        type: 'confirm',
        name: 'prettier',
        default: modules.isPresent('prettier'),
        message: 'Do you want to use prettier to format files?',
      },
    ]);

    this.confirm = prettier;

    if (this.confirm) {
      dependencies.add('prettier', 'devDependencies');
    }
  }

  public async writing(): Promise<void> {
    if (this.confirm) {
      const defaultConfig = {
        arrowParens: 'always',
        printWidth: 100,
        proseWrap: 'never',
        singleQuote: true,
        trailingComma: 'all',
      };

      await configs.save('.prettierrc.json', defaultConfig);
    }
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
