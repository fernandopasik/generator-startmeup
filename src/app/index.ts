import type { ComposeOptions } from 'yeoman-generator';
import Generator from '../generator.js';

export default class StartMeUpGenerator extends Generator {
  public async initializing(): Promise<void> {
    this.log('Welcome to the marvelous StartMeUp generator!');

    let subGenerators = [
      'git',
      'license',
      'editorconfig',
      'packagejson',
      'prettier',
      'commit-lint',
      'libraries',
      'typescript',
      'babel',
      'src',
      'jest',
      'eslint',
      'lint-staged',
      'hooks',
      'readme',
      'badges',
      'docs',
      'rollup',
      'verify',
      'github-actions',
    ];

    if (typeof this.packageJson.get('name') === 'undefined') {
      const { typescript } = await this.prompt<{ typescript: boolean }>({
        type: 'confirm',
        name: 'typescript',
        message: 'Are you programming with TypeScript?',
        default: true,
      });

      if (!typescript) {
        subGenerators = subGenerators.filter((subGenerator) => subGenerator !== 'typescript');
      }
    }

    if (!subGenerators.includes('typescript')) {
      const { babel } = await this.prompt<{ babel: boolean }>({
        type: 'confirm',
        name: 'babel',
        message: 'Do you want to compile with Babel?',
        default: false,
      });

      if (!babel) {
        subGenerators = subGenerators.filter((subGenerator) => subGenerator !== 'babel');
      }
    } else {
      subGenerators = subGenerators.filter((subGenerator) => subGenerator !== 'babel');
    }

    subGenerators.forEach((subGenerator) => {
      this.composeWith(`startmeup:${subGenerator}`, {
        'skip-install': true,
        all: 'true',
      } as ComposeOptions);
    });
  }
}
