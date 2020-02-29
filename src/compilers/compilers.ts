import Generator from 'yeoman-generator';
import 'core-js/features/array/flat-map';
import { format, resolveConfig } from 'prettier';

import { dependencies } from '../core';
import { COMPILERS, COMPILER_DEPENDENCIES } from './dependencies';
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
    this.answers = {
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'compilers',
          message: 'Which compiler do you want to use?',
          choices: COMPILERS,
          default: COMPILERS.filter((compilerName: string): boolean =>
            COMPILER_DEPENDENCIES[compilerName].reduce(
              (acc: boolean, name: string): boolean => acc || dependencies.has(name, 'all'),
              false,
            ),
          ),
        },
      ])),
    };
  }

  public configuring(): void {
    const { compilers = [] } = this.answers;

    const packages = compilers.flatMap(
      (compilerName: string): string[] => COMPILER_DEPENDENCIES[compilerName],
    );

    if (compilers.includes('babel')) {
      addPreset('@babel/preset-env');
      dependencies.add('@babel/preset-env', 'devDependencies');

      if (dependencies.has('react')) {
        addPreset('@babel/preset-react');
        dependencies.add('@babel/preset-react', 'devDependencies');
      }

      if (compilers.includes('typescript')) {
        addPreset('@babel/preset-typescript');
      }
    }

    packages.forEach((packageName) => dependencies.add(packageName, 'devDependencies'));
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
