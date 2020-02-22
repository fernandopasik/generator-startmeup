import Generator from 'yeoman-generator';

import { add, addDev, get, getDev, has, hasDev, addFromPkg } from '../app/dependencies/index';

const LIBRARIES = ['lit-html', 'react'];

export default class LibrariesGenerator extends Generator {
  private libraries: string[] = [];

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    const { libraries } = await this.prompt([
      {
        type: 'checkbox',
        name: 'libraries',
        message: 'Which UI library do you want to use?',
        choices: LIBRARIES,
        default: LIBRARIES.filter((library: string): boolean => has(library)),
      },
    ]);

    this.libraries = libraries;
  }

  public configuring(): void {
    if (this.libraries.includes('lit-html')) {
      add(['lit-html', 'lit-element']);
    }

    if (this.libraries.includes('react')) {
      add(['react', 'react-dom']);
      addDev(['react-test-renderer']);

      if (hasDev('@babel/core')) {
        addDev(['@babel/preset-react']);
      }

      if (hasDev('typescript')) {
        addDev(['@types/react', '@types/react-dom']);
      }
    }
  }

  public install(): void {
    this.yarnInstall(get());
    this.yarnInstall(getDev(), { dev: true });
  }
}
