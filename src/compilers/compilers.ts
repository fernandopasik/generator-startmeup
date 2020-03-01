import Generator from 'yeoman-generator';
import 'core-js/features/array/flat-map';
import { format, resolveConfig } from 'prettier';

import { dependencies } from '../core';
import { addPreset, getConfig } from './babelConfig';
import getTSConfig from './tsConfig';
import prettifyJson from '../prettier/prettify-json';

export default class CompilerGenerator extends Generator {
  private answers: {
    compilers?: string[];
  } = {};

  public initializing(): void {
    dependencies.importFromPkg(this.fs.readJSON('package.json'));
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
    const prettierConfig = (await resolveConfig(process.cwd())) || {};

    if (compilers.includes('babel')) {
      const babelConfigJs = format(`module.exports=${JSON.stringify(getConfig())}`, {
        ...prettierConfig,
        parser: 'babel',
      });
      this.fs.write(this.destinationPath('babel.config.js'), babelConfigJs);
    }

    if (compilers.includes('typescript')) {
      this.fs.write(
        this.destinationPath('tsconfig.json'),
        prettifyJson(getTSConfig(), prettierConfig),
      );
    }
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
