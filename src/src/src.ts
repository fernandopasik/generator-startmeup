import Generator from 'yeoman-generator';
import { configs, dependencies } from '../core';
import { PackageJson } from '../packagejson/package-json';

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

    const mainBuiltFile = `${name}.js`;
    const builtFiles = `/${name}.*`;

    const packageProps: Record<string, boolean | string | string[]> = {
      sideEffects: false,
      type: 'module',
      main: mainBuiltFile,
      module: mainBuiltFile,
      files: [builtFiles],
    };

    if (dependencies.has('typescript', 'dev')) {
      packageProps.typings = `${name}.d.ts`;
    }

    configs.set('package.json', {
      ...pkg,
      ...packageProps,
    });

    const mainFile = `src/${name}.${extension}`;
    this.fs.write(this.destinationPath(mainFile), '');
  }
}
