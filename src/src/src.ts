// eslint-disable-next-line import/no-extraneous-dependencies
import sort from 'sort-package-json';
import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import { configs, dependencies } from '../core';

export default class SrcGenerator extends Generator {
  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async writing(): Promise<void> {
    const pkg = (await configs.load('package.json')) as PackageJson;
    const { name } = pkg;

    let extension = 'js';

    if (dependencies.has('typescript', 'dev')) {
      extension = 'ts';
    }

    if (dependencies.has('react')) {
      extension += 'x';
    }

    const mainBuiltFile = `${name as string}.js`;
    const builtFiles = `/${name as string}.*`;

    const packageProps: Record<string, boolean | string | string[]> = {
      sideEffects: false,
      type: 'module',
      main: mainBuiltFile,
      module: mainBuiltFile,
      files: ['/lib', builtFiles],
    };

    if (dependencies.has('typescript', 'dev')) {
      packageProps.typings = `${name as string}.d.ts`;
    }

    configs.set(
      'package.json',
      sort({
        ...pkg,
        ...packageProps,
      }),
    );

    const mainFile = `src/${name as string}.${extension}`;
    if (!this.fs.exists(this.destinationPath(mainFile))) {
      this.fs.write(this.destinationPath(mainFile), '');
    }

    await configs.saveAll();
  }
}
