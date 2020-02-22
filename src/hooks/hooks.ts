import Generator from 'yeoman-generator';
import { addDev, getDev, has, hasDev, addFromPkg } from '../app/dependencies/index';

interface Hooks {
  [name: string]: string;
}

export default class HooksGenerator extends Generator {
  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public writing(): void {
    const commands = [];
    const extensions = [];

    if (hasDev('eslint')) {
      commands.push('eslint');
    }

    if (hasDev('jest')) {
      commands.push('jest --bail --findRelatedTests');
    }

    if (hasDev('typescript')) {
      extensions.push('ts');

      if (has('react')) {
        extensions.push('tsx');
      }
    } else {
      extensions.push('js');

      if (has('react')) {
        extensions.push('jsx');
      }
    }

    if (commands.length > 0) {
      this.fs.writeJSON(this.destinationPath('.lintstagedrc.json'), {
        [`*.{${extensions.join(',')}}`]: commands,
      });

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
