import Generator from 'yeoman-generator';

import { ask, dependencies } from '../core';

const LIBRARIES = ['lit-html', 'react'];

export default class LibrariesGenerator extends Generator {
  private libraries: string[] = [];

  public initializing(): void {
    dependencies.importFrom(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    const { libraries } = await ask([
      {
        type: 'checkbox',
        name: 'libraries',
        message: 'Which UI library do you want to use?',
        choices: LIBRARIES,
        default: LIBRARIES.filter((library: string): boolean => dependencies.has(library, 'all')),
      },
    ]);

    this.libraries = libraries;
  }

  public configuring(): void {
    if (this.libraries.includes('lit-html')) {
      dependencies.add('lit-html');
      dependencies.add('lit-element');
    }

    if (this.libraries.includes('react')) {
      dependencies.add('react');
      dependencies.add('react-dom');
      dependencies.add('react-test-renderer', 'devDependencies');

      if (dependencies.has('@babel/core', 'devDependencies')) {
        dependencies.add('@babel/preset-react', 'devDependencies');
      }

      if (dependencies.has('typescript', 'devDependencies')) {
        dependencies.add('@types/react', 'devDependencies');
        dependencies.add('@types/react-dom', 'devDependencies');
      }
    }
  }

  public install(): void {
    this.yarnInstall(dependencies.get());
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
