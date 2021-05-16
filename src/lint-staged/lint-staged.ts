import { format } from '../core/configs';
import Generator from '../generator';

export default class LintStagedGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['lint-staged']);

    const config: Record<string, string[] | string> = {};
    const jsExtensions = this.getJsExtensions();

    const jsCommands = [];

    if (this.hasAnyDependency('eslint')) {
      jsCommands.push('eslint');
    }

    if (this.hasAnyDependency('jest')) {
      jsCommands.push('jest --bail --findRelatedTests');
    }

    if (jsCommands.length > 0) {
      const matcher = `*.{${jsExtensions.join(',')}}`;
      config[matcher] = jsCommands;
    }

    const formattedConfig = await format(config);

    this.writeDestination('.lintstagedrc.json', formattedConfig);
  }
}
