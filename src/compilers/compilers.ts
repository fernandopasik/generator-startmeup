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
          dependencies.has(compilerDependencies[compilerName], 'devDependencies'),
        ),
      },
    ]);

    this.compilers = compilers as string[];
  }

  public configuring(): void {
    if (this.compilers.includes('babel')) {
      dependencies.add('@babel/core', 'devDependencies');
      addPreset('@babel/preset-env');
      dependencies.add('@babel/preset-env', 'devDependencies');

      if (dependencies.has('react')) {
        addPreset('@babel/preset-react');
        dependencies.add('@babel/preset-react', 'devDependencies');
      }

      if (this.compilers.includes('typescript')) {
        addPreset('@babel/preset-typescript');
        dependencies.add('@babel/preset-typescript', 'devDependencies');
      } else {
        dependencies.add('@babel/cli', 'devDependencies');
      }
    }

    if (this.compilers.includes('typescript')) {
      dependencies.add('typescript', 'devDependencies');
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
