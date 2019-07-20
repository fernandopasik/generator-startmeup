import Generator from 'yeoman-generator';
import yosay from 'yosay';

export default class StartMeUpGenerator extends Generator {
  public initializing(): void {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    const subGenerators = [
      'init',
      'packagejson',
      'compiler',
      'libraries',
      'test',
      'lint',
      'hooks',
      'docs',
    ];

    subGenerators.forEach((subGenerator: string): void => {
      this.composeWith(`startmeup:${subGenerator}`, {});
    });
  }
}
