import sort from 'sort-package-json';
import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import { configs, dependencies } from '../core';

export default class SrcGenerator extends Generator {
  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async writing(): Promise<void> {
    const pkg = await configs.load<PackageJson>('package.json');

    if (typeof pkg?.name === 'undefined') {
      return;
    }

    const { name } = pkg;

    let extension = 'js';

    if (dependencies.has('typescript', 'dev')) {
      extension = 'ts';
    }

    if (dependencies.has('react')) {
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

    if (dependencies.has('typescript', 'dev')) {
      packageProps.typings = `${name}.d.ts`;
    }

    configs.set(
      'package.json',
      sort({
        ...pkg,
        ...packageProps,
      }),
    );

    const mainFile = `src/${name}.${extension}`;
    if (!this.fs.exists(this.destinationPath(mainFile))) {
      this.fs.write(this.destinationPath(mainFile), '');
    }

    await configs.saveAll();
  }
}
