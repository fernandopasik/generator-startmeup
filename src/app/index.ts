import Generator from 'yeoman-generator';
import yosay from 'yosay';

export default class StartMeUpGenerator extends Generator {
  initializing() {
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

    subGenerators.map(subGenerator => {
      this.composeWith(`startmeup:${subGenerator}`, {});
    });
  }
}
