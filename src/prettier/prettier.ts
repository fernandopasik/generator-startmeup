import Generator from 'yeoman-generator';

import { dependencies, configs, modules } from '../core';
import config from './config';

export default class PrettierGenerator extends Generator {
  private confirm: boolean = true;

  public async initializing(): Promise<void> {
    await dependencies.importAll();
    modules.load('prettier', config);
  }

  public async prompting(): Promise<void> {
    this.confirm = await modules.confirm('prettier', config.confirmMessage);

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
