import Generator from 'yeoman-generator';

import { add, addDev, get, getDev, has, addFromPkg } from '../app/dependencies/index';

const LIBRARIES = ['lit-html', 'react'];

export default class LibrariesGenerator extends Generator {
  private answers: {
    libraries?: string[];
  } = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    this.answers = await this.prompt([
      {
        type: 'checkbox',
        name: 'libraries',
        message: 'Which UI library do you want to use?',
        choices: LIBRARIES,
        default: LIBRARIES.filter((library: string): boolean => has(library)),
      },
    ]);
  }

  public configuring(): void {
    const { libraries = [] } = this.answers;

    if (libraries.includes('lit-html')) {
      add(['lit-html', 'lit-element']);
    }

    if (libraries.includes('react')) {
      add(['react', 'react-dom']);
      addDev(['react-test-renderer']);

      if (has('@babel/core')) {
        addDev(['@babel/preset-react']);
        // this.babelConfig.presets.push('@babel/preset-react');
      }

      if (has('typescript')) {
        addDev(['@types/react', '@types/react-dom']);
      }
    }
  }

  public install(): void {
    this.yarnInstall(get());
    this.yarnInstall(getDev(), { dev: true });
  }
}
