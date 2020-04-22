import Generator from 'yeoman-generator';

import { ask, dependencies } from '../core';

const LIBRARIES = ['lit-html', 'react'];

export default class LibrariesGenerator extends Generator {
  private libraries: string[] = [];

  public async initializing(): Promise<void> {
    await dependencies.importAll();
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

    this.libraries = libraries as string[];

    if (this.libraries.includes('lit-html')) {
      dependencies.add('lit-html', 'peerDependencies');
      dependencies.add('lit-element', 'peerDependencies');
    }

    if (this.libraries.includes('react')) {
      dependencies.add('react', 'peerDependencies');
      dependencies.add('react-dom', 'peerDependencies');
      dependencies.add('react-test-renderer', 'devDependencies');
    }
  }

  public configuring(): void {
    if (this.libraries.includes('react')) {
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
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
