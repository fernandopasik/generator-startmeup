import yosay from 'yosay';
import Generator from '../generator';

interface Confirmation {
  type: string;
  name: string;
  message: string;
  default: boolean;
  skip: boolean;
}

export default class StartMeUpGenerator extends Generator {
  public async initializing(): Promise<void> {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    const subGenerators = [
      'git',
      'github-templates',
      'license',
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

    const subGeneratorConfirmations: Confirmation[] = [
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Are you programming with TypeScript?',
        default: true,
        skip: this.hasFiles('src/**/*.ts'),
      },
      {
        type: 'confirm',
        name: 'babel',
        message: 'Do you want to compile with Babel?',
        default: false,
        skip: this.hasFiles('babel.config.js') || this.hasFiles('**/.babelrc.json'),
      },
      {
        type: 'confirm',
        name: 'github-templates',
        message: 'Are you pushing the repo to github?',
        default: true,
        skip: this.hasFiles('.github'),
      },
    ];

    const confirms = await this.prompt<Record<string, boolean>>(
      subGeneratorConfirmations.filter(
        (confirmation: Readonly<Confirmation>) => !confirmation.skip,
      ),
    );

    subGenerators.forEach((subGenerator) => {
      if (!(subGenerator in confirms) || confirms[subGenerator]) {
        this.composeWith(`startmeup:${subGenerator}`, { 'skip-install': true });
      }
    });
  }
}
