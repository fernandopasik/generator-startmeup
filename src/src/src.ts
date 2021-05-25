import type { PackageJson } from 'type-fest';
import { configs } from '../core';
import Generator from '../generator';

export default class SrcGenerator extends Generator {
  public async writing(): Promise<void> {
    const pkg = await configs.load<PackageJson>('package.json');

    if (typeof pkg?.name === 'undefined') {
      return;
    }

    const { name } = pkg;

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
      sideEffects: false,
      type: 'module',
      main: mainBuiltFile,
      module: mainBuiltFile,
      files: ['/lib', builtFiles],
    };

    if (this.hasDevDependency('typescript')) {
      packageProps.typings = `${name}.d.ts`;
    }

    this.packageJson.merge(packageProps);

    const mainFile = `src/${name}.${extension}`;
    if (!this.fs.exists(this.destinationPath(mainFile))) {
      this.fs.write(this.destinationPath(mainFile), '');
    }

    await configs.saveAll();
  }
}
