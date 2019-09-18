import Generator from 'yeoman-generator';
import { addDev, getDev, has, addFromPkg } from '../app/dependencies/index';

interface Hooks {
  [name: string]: string;
}

export default class HooksGenerator extends Generator {
  confirm?: boolean;

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public writing(): void {
    const commands = [];
    const extensions = [];

    if (has('eslint')) {
      commands.push('eslint');
    }

    if (has('jest')) {
      commands.push('jest --bail --findRelatedTests');
    }

    if (has('typescript')) {
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

    if (has('lint-staged')) {
      config.hooks['pre-commit'] = 'lint-staged';
    }

    config.hooks['pre-push'] = 'yarn preversion';

    if (Object.keys(config.hooks).length > 0) {
      this.fs.writeJSON(this.destinationPath('.huskyrc.json'), config);

      addDev(['husky']);
    }
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
