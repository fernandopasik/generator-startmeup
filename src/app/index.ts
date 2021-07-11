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
      'license',
      'editorconfig',
      'packagejson',
      'prettier',
      'commit-lint',
      'libraries',
      'typescript',
      'babel',
      'jest',
      'eslint',
      'lint-staged',
      'hooks',
      'readme',
      'badges',
      'docs',
      'src',
      'rollup',
    ];

    const subGeneratorConfirmations: Confirmation[] = [
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Are you programming with TypeScript?',
        default: true,
        skip: this.hasDevDependency('typescript') || this.hasFiles('src/**/*.ts'),
      },
      {
        type: 'confirm',
        name: 'babel',
        message: 'Do you want to compile with Babel?',
        default: false,
        skip:
          this.hasDevDependency('@babel/core') ||
          this.hasFiles('babel.config.js') ||
          this.hasFiles('**/.babelrc.json'),
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
