import Generator from 'yeoman-generator';
import * as configs from '../configs';
import * as dependencies from '../dependencies';
import * as modules from '../modules';

export default class CoreGenerator extends Generator {
  public moduleConfig?: modules.ModuleConfig;

  public async initializing(): Promise<void> {
    await dependencies.importAll();
    if (typeof this.moduleConfig !== 'undefined') {
      modules.load(this.moduleConfig.name, this.moduleConfig);
    }
  }

  public async prompting(): Promise<void> {
    if (typeof this.moduleConfig !== 'undefined') {
      await modules.run(this.moduleConfig.name);
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
