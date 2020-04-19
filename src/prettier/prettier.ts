import Generator from 'yeoman-generator';

import { dependencies, configs, modules } from '../core';
import config from './config';

export default class PrettierGenerator extends Generator {
  private confirm: boolean = true;

  public async initializing(): Promise<void> {
    await dependencies.importAll();
    modules.load(config.name, config);
  }

  public async prompting(): Promise<void> {
    this.confirm = await modules.confirm(config.name, config.confirmMessage);

    if (this.confirm) {
      dependencies.add('prettier', 'devDependencies');

      const defaultConfig = {
        arrowParens: 'always',
        printWidth: 100,
        proseWrap: 'never',
        singleQuote: true,
        trailingComma: 'all',
      };

      configs.set('.prettierrc.json', defaultConfig);
    }
  }

  public async writing(): Promise<void> {
    await configs.saveAll();
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
