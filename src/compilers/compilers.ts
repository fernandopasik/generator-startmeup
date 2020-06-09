import 'core-js/features/array/flat-map';
import Generator from 'yeoman-generator';
import { ask, configs, dependencies } from '../core';
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

    if (this.compilers.includes('babel')) {
      configs.set('babel.config.js', configs.sortProps(getBabelConfig(), ['extends', 'files']));
    }

    if (this.compilers.includes('typescript')) {
      configs.set('tsconfig.json', configs.sortProps(getTSConfig(), ['extends', 'files']));
      configs.set('tsconfig.all.json', configs.sortProps(getTSConfigAll(), ['extends', 'files']));
    }
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
