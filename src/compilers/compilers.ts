import Generator from 'yeoman-generator';
import { ask, configs, dependencies } from '../core';
import { addPreset, getBabelConfig } from './babelConfig';

export default class CompilerGenerator extends Generator {
  private compilers: string[] = [];

  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async prompting(): Promise<void> {
    const compilerDependencies: Record<string, string> = {
      babel: '@babel/core',
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
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
