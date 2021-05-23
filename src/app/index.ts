import yosay from 'yosay';
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
      'babel',
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
        skip: this.hasFiles('src/**/*.ts'),
      },
      babel: {
        message: 'Do you want to compile with Babel?',
        default: false,
        skip: this.hasFiles('babel.config.js') || this.hasFiles('**/.babelrc.json'),
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
}
