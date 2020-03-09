import Generator from 'yeoman-generator';
import 'core-js/features/array/flat-map';

import { dependencies, configs } from '../core';
import { addPreset, getBabelConfig } from './babelConfig';
import getTSConfig, { getTSConfigAll } from './tsConfig';

export default class CompilerGenerator extends Generator {
  private answers: {
    compilers?: string[];
  } = {};

  public initializing(): void {
    dependencies.importFrom(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    const compilers: Record<string, string> = {
      babel: '@babel/core',
      typescript: 'typescript',
    };

    this.answers = {
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'compilers',
          message: 'Which compiler do you want to use?',
          choices: Object.keys(compilers),
          default: Object.keys(compilers).filter((compilerName: string): boolean =>
            dependencies.has(compilers[compilerName], 'devDependencies'),
          ),
        },
      ])),
    };
  }

  public configuring(): void {
    const { compilers = [] } = this.answers;

    if (compilers.includes('babel')) {
      dependencies.add('@babel/core', 'devDependencies');
      addPreset('@babel/preset-env');
      dependencies.add('@babel/preset-env', 'devDependencies');

      if (dependencies.has('react')) {
        addPreset('@babel/preset-react');
        dependencies.add('@babel/preset-react', 'devDependencies');
      }

      if (compilers.includes('typescript')) {
        addPreset('@babel/preset-typescript');
        dependencies.add('@babel/preset-typescript', 'devDependencies');
      } else {
        dependencies.add('@babel/cli', 'devDependencies');
      }
    }

    if (compilers.includes('typescript')) {
      dependencies.add('typescript', 'devDependencies');
    }
  }

  public async writing(): Promise<void> {
    const { compilers = [] } = this.answers;

    if (compilers.includes('babel')) {
      await configs.save('babel.config.js', getBabelConfig(), 'js');
    }

    if (compilers.includes('typescript')) {
      await configs.save('tsconfig.json', getTSConfig());
      await configs.save('tsconfig.all.json', getTSConfigAll());
    }
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
