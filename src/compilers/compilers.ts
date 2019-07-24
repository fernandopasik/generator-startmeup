import Generator from 'yeoman-generator';
import 'core-js/features/array/flat-map';

import { COMPILERS, COMPILER_DEPENDENCIES } from './dependencies';
import { addDev, getDev, has, hasAny, addFromPkg } from '../app/dependencies/index';
import { addPreset, formatFile } from './babelConfig';
import tsConfig from './tsConfig';

export default class CompilerGenerator extends Generator {
  private answers: {
    compilers?: string[];
  } = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    this.answers = {
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'compilers',
          message: 'Which compiler do you want to use?',
          choices: COMPILERS,
          default: COMPILERS.filter((compilerName: string): boolean =>
            hasAny(COMPILER_DEPENDENCIES[compilerName]),
          ),
        },
      ])),
    };
  }

  public configuring(): void {
    const { compilers = [] } = this.answers;

    const dependencies = compilers.flatMap(
      (compilerName: string): string[] => COMPILER_DEPENDENCIES[compilerName],
    );

    if (compilers.includes('babel')) {
      addPreset('@babel/preset-env');

      if (has('react')) {
        addPreset('@babel/preset-react');
        addDev('@babel/preset-react');
      }

      if (compilers.includes('typescript')) {
        addPreset('@babel/preset-typescript');
      }

      this.fs.write('babel.config.js', formatFile());
    }

    if (compilers.includes('typescript')) {
      this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsConfig);
    }

    addDev(dependencies);
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
