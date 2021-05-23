import yosay from 'yosay';
import { dependencies } from '../core';
import Generator from '../generator';

interface Confirmation {
  message: string;
  default: boolean;
  skip: boolean;
}

export default class StartMeUpGenerator extends Generator {
  public async initializing(): Promise<void> {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    const subGenerators = [
      'git',
      'editorconfig',
      'packagejson',
      'prettier',
      'commit-lint',
      'libraries',
      'typescript',
      'jest',
      'lint',
      'lint-staged',
      'hooks',
      'docs',
      'src',
    ];

    const subGeneratorConfirmations: Record<string, Confirmation> = {
      typescript: {
        message: 'Are you programming with TypeScript?',
        default: true,
        skip: this.hasFiles('**/*.ts'),
      },
    };

    await Promise.all(
      subGenerators.map(async (subGenerator: string): Promise<void> => {
        const confirmation = subGeneratorConfirmations[subGenerator];

        let run = true;

        if (typeof confirmation !== 'undefined' && !confirmation.skip) {
          run = await this.confirm(confirmation.message, confirmation.default);
        }

        if (run) {
          this.composeWith(`startmeup:${subGenerator}`, { 'skip-install': true });
        }
      }),
    );
  }

  public install(): void {
    dependencies.install();
  }
}
