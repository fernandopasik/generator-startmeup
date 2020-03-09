import Generator from 'yeoman-generator';
import yosay from 'yosay';

import { dependencies } from '../core';

export default class StartMeUpGenerator extends Generator {
  public initializing(): void {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

    const subGenerators = [
      'init',
      'packagejson',
      'prettier',
      'commit-lint',
      'libraries',
      'compilers',
      'jest',
      'lint',
      'hooks',
      'docs',
      'src',
    ];

    subGenerators.forEach((subGenerator: string): void => {
      this.composeWith(`startmeup:${subGenerator}`, { 'skip-install': true });
    });
  }

  public install(): void {
    this.yarnInstall(dependencies.get());
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
