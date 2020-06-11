// eslint-disable-next-line import/no-extraneous-dependencies
import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import { configs, dependencies } from '../core';

export default class SrcGenerator extends Generator {
  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async writing(): Promise<void> {
    const pkg = (await configs.load('package.json')) as PackageJson;
    const { main, name } = pkg;

    if (this.fs.exists(this.destinationPath(main as string))) {
      return;
    }

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
      files: [builtFiles],
    };

    if (dependencies.has('typescript', 'dev')) {
      packageProps.typings = `${name as string}.d.ts`;
    }

    configs.set('package.json', {
      ...pkg,
      ...packageProps,
    });

    const mainFile = `src/${name as string}.${extension}`;
    this.fs.write(this.destinationPath(mainFile), '');
  }
}
