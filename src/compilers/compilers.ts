import Generator from 'yeoman-generator';
import 'core-js/features/array/flat-map';

import { ask, dependencies, configs } from '../core';
import { addPreset, getBabelConfig } from './babelConfig';
import getTSConfig, { getTSConfigAll } from './tsConfig';

export default class CompilerGenerator extends Generator {
  private compilers: string[] = [];

  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async prompting(): Promise<void> {
    const compilerDependencies: Record<string, string> = {
      babel: '@babel/core',
      typescript: 'typescript',
    };

    const { compilers } = await ask([
      {
        type: 'checkbox',
        name: 'compilers',
        message: 'Which compiler do you want to use?',
        choices: Object.keys(compilerDependencies),
        default: Object.keys(compilerDependencies).filter((compilerName: string): boolean =>
          dependencies.has(compilerDependencies[compilerName], 'dev'),
        ),
      },
    ]);

    this.compilers = compilers as string[];

    if (this.compilers.includes('babel')) {
      dependencies.add('@babel/core', 'dev');
    }

    if (this.compilers.includes('typescript')) {
      dependencies.add('typescript', 'dev');
    }
  }

  public configuring(): void {
    if (this.compilers.includes('babel')) {
      addPreset('@babel/preset-env');
      dependencies.add('@babel/preset-env', 'dev');

      if (dependencies.has('react') || dependencies.has('react', 'peer')) {
        addPreset('@babel/preset-react');
        dependencies.add('@babel/preset-react', 'dev');
      }

      if (this.compilers.includes('typescript')) {
        addPreset('@babel/preset-typescript');
        dependencies.add('@babel/preset-typescript', 'dev');
      } else {
        dependencies.add('@babel/cli', 'dev');
      }
    }
  }

  public async writing(): Promise<void> {
    if (this.compilers.includes('babel')) {
      await configs.save('babel.config.js', getBabelConfig());
    }

    if (this.compilers.includes('typescript')) {
      await configs.save('tsconfig.json', getTSConfig());
      await configs.save('tsconfig.all.json', getTSConfigAll());
    }
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
