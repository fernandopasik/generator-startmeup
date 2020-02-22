import Generator from 'yeoman-generator';
import { has, hasDev, addFromPkg } from '../app/dependencies/index';

export default class SrcGenerator extends Generator {
  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public writing(): void {
    let extension = 'js';

    if (hasDev('typescript')) {
      extension = 'ts';
    }

    if (has('react')) {
      extension += 'x';
    }

    this.fs.write(this.destinationPath(`src/index.${extension}`), '');
  }
}
