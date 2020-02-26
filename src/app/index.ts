import Generator from 'yeoman-generator';
import yosay from 'yosay';

import { getDev, get } from './dependencies';

export default class StartMeUpGenerator extends Generator {
  public initializing(): void {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    const subGenerators = [
      'init',
      'packagejson',
      'prettier',
      'libraries',
      'compilers',
      'jest',
      'lint',
      'hooks',
      'docs',
      'commit-lint',
      'src',
    ];

    subGenerators.forEach((subGenerator: string): void => {
      this.composeWith(`startmeup:${subGenerator}`, { 'skip-install': true });
    });
  }

  public install(): void {
    this.yarnInstall(get());
    this.yarnInstall(getDev(), { dev: true });
  }
}
