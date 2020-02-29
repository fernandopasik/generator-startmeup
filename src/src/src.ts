import Generator from 'yeoman-generator';
import { dependencies } from '../core';

export default class SrcGenerator extends Generator {
  public initializing(): void {
    dependencies.importFromPkg(this.fs.readJSON('package.json'));
  }

  public writing(): void {
    let extension = 'js';

    if (dependencies.has('typescript', 'devDependencies')) {
      extension = 'ts';
    }

    if (dependencies.has('react')) {
      extension += 'x';
    }

    this.fs.write(this.destinationPath(`src/index.${extension}`), '');
  }
}
