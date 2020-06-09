import Generator from 'yeoman-generator';
import { configs, dependencies } from '../core';
import { PackageJson } from '../packagejson/package-json';

export default class SrcGenerator extends Generator {
  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async writing(): Promise<void> {
    const pkg = await configs.load<PackageJson>('package.json');

    if (typeof pkg?.main === 'undefined' || !this.fs.exists(this.destinationPath(pkg.main))) {
      let extension = 'js';

      if (dependencies.has('typescript', 'dev')) {
        extension = 'ts';
      }

      if (dependencies.has('react')) {
        extension += 'x';
      }

      this.fs.write(this.destinationPath(`src/index.${extension}`), '');
    }
  }
}
