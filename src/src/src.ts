import Generator from 'yeoman-generator';
import { dependencies } from '../core';

export default class SrcGenerator extends Generator {
  private mainPath: string = '';

  public initializing(): void {
    const pkg = this.fs.readJSON('package.json');
    dependencies.importFromPkg(pkg);
    this.mainPath = this.destinationPath(pkg.main);
  }

  public writing(): void {
    if (!this.fs.exists(this.mainPath)) {
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
}
