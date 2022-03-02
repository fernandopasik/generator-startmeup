import Generator from '../generator.js';

interface Confirmation {
  type: string;
  name: string;
  message: string;
  default: boolean;
  skip: boolean;
}

export default class StartMeUpGenerator extends Generator {
  public async initializing(): Promise<void> {
    this.log('Welcome to the marvelous StartMeUp generator!');

    this.config.set('all', true);

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

    const subGeneratorConfirmations: Confirmation[] = [
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Are you programming with TypeScript?',
        default: true,
        skip: this.hasAnyDependency('typescript') || this.hasFiles('src/**/*.ts'),
      },
      {
        type: 'confirm',
        name: 'babel',
        message: 'Do you want to compile with Babel?',
        default: false,
        skip:
          this.hasDevDependency('typescript') ||
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
      // eslint-disable-next-line security/detect-object-injection
      if (!(subGenerator in confirms) || confirms[subGenerator]) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.composeWith(`startmeup:${subGenerator}`, { 'skip-install': true });
      }
    });
  }
}
