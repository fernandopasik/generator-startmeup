import { format } from '../core/configs';
import Generator from '../generator';

export default class LintStagedGenerator extends Generator {
  public confirmed = true;

  public async prompting(): Promise<void> {
    this.confirmed = await this.confirm('Do you want to use lint-staged for pre-commit hook?');
  }

  public async configuring(): Promise<void> {
    if (!this.confirmed) {
      return;
    }

    await this.addDevDependencies(['lint-staged']);

    const config: Record<string, string[] | string> = {};
    const jsExtensions = ['js'];

    if (this.hasAnyDependency('react')) {
      jsExtensions.push('jsx');
    }

    if (this.hasDevDependency('typescript')) {
      jsExtensions.push('ts');

      if (this.hasAnyDependency('react')) {
        jsExtensions.push('tsx');
      }
    }

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
