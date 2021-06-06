import type { PackageJson } from 'type-fest';
import Generator from '../generator';

export default class SrcGenerator extends Generator {
  public writing(): void {
    const name = this.packageJson.get('name') as PackageJson['name'];

    if (typeof name === 'undefined') {
      return;
    }

    let extension = 'js';

    if (this.hasDevDependency('typescript')) {
      extension = 'ts';
    }

    if (this.hasAnyDependency('react')) {
      extension += 'x';
    }

    const mainBuiltFile = `${name}.js`;
    const builtFiles = `/${name}.*`;

    const packageProps: Record<string, string[] | boolean | string> = {
      type: 'module',
      main: mainBuiltFile,
      module: mainBuiltFile,
      files: ['/lib', builtFiles],
    };

    if (this.hasDevDependency('typescript')) {
      packageProps.typings = `${name}.d.ts`;
    }

    if (!this.hasAnyDependency('lit')) {
      packageProps.sideEffects = false;
    }

    this.packageJson.merge(packageProps);

    const mainFile = `src/${name}.${extension}`;
    if (!this.fs.exists(this.destinationPath(mainFile))) {
      this.fs.write(this.destinationPath(mainFile), '');
    }
  }
}
