import type { GetGeneratorOptions } from '@yeoman/types';
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
        default: true,
        message: 'Are you programming with TypeScript?',
        name: 'typescript',
        type: 'confirm',
      });

      if (!typescript) {
        subGenerators = subGenerators.filter((subGenerator) => subGenerator !== 'typescript');
      }
    }

    if (!subGenerators.includes('typescript')) {
      const { babel } = await this.prompt<{ babel: boolean }>({
        default: false,
        message: 'Do you want to compile with Babel?',
        name: 'babel',
        type: 'confirm',
      });

      if (!babel) {
        subGenerators = subGenerators.filter((subGenerator) => subGenerator !== 'babel');
      }
    } else {
      subGenerators = subGenerators.filter((subGenerator) => subGenerator !== 'babel');
    }

    subGenerators = subGenerators.map((subGenerator) => `startmeup:${subGenerator}`);

    await this.composeWith(subGenerators, {
      all: 'true',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'skip-install': true,
    } as Partial<GetGeneratorOptions>);
  }
}
