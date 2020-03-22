import Generator from 'yeoman-generator';
import { dependencies } from '../core';

export default class SrcGenerator extends Generator {
  private mainPath: string | undefined;

  public async initializing(): Promise<void> {
    await dependencies.importAll();
    const pkg = this.fs.readJSON('package.json');
    this.mainPath = pkg?.main;
  }

  public writing(): void {
    if (
      typeof this.mainPath === 'undefined' ||
      !this.fs.exists(this.destinationPath(this.mainPath))
    ) {
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
