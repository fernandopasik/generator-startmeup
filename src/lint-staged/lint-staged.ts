import Generator from 'yeoman-generator';
import { configs, dependencies, modules } from '../core';
import config from './config';

export default class CommitLintGenerator extends Generator {
  public async initializing(): Promise<void> {
    await dependencies.importAll();
    modules.load(config.name, config);
  }

  public async prompting(): Promise<void> {
    await modules.run(config.name);
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
