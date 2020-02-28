import Generator from 'yeoman-generator';
import prettier from 'prettier';

import { addDev, getDev, hasDev, addFromPkg } from '../app/dependencies/index';
import { buildConfig as buildLintStagedConfig, LintStagedConfig } from './lint-staged';
import prettifyJson from '../prettier/prettify-json';

interface Hooks {
  [name: string]: string;
}

export default class HooksGenerator extends Generator {
  private lintStagedConfig: LintStagedConfig = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public configuring(): void {
    this.lintStagedConfig = buildLintStagedConfig();
  }

  public async writing(): Promise<void> {
    const prettierConfig = (await prettier.resolveConfig(process.cwd())) || {};

    if (Object.keys(this.lintStagedConfig).length > 0) {
      prettifyJson(this.lintStagedConfig);

      this.fs.write(
        this.destinationPath('.lintstagedrc.json'),
        prettifyJson(this.lintStagedConfig, prettierConfig),
      );

      addDev(['lint-staged']);
    }

    const config: { hooks: Hooks } = { hooks: {} };

    if (hasDev('lint-staged')) {
      config.hooks['pre-commit'] = 'lint-staged';
    }

    config.hooks['pre-push'] = 'yarn verify';

    if (Object.keys(config.hooks).length > 0) {
      this.fs.writeJSON(this.destinationPath('.huskyrc.json'), config);

      addDev(['husky']);
    }
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
