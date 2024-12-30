import Generator from '../generator.ts';

const FRAMEWORKS = ['none', 'lit', 'react'];

export default class LibrariesGenerator extends Generator {
  public async prompting(): Promise<void> {
    if (
      typeof this.option('all') !== 'undefined' &&
      typeof this.packageJson.get('name') !== 'undefined'
    ) {
      return;
    }

    const { framework } = await this.prompt<{ framework: string }>([
      {
        choices: FRAMEWORKS,
        default: FRAMEWORKS.find((frameworkName) => this.hasAnyDependency(frameworkName)),
        message: 'Which framework do you want to use?',
        name: 'framework',
        type: 'list',
      },
    ]);

    if (framework === 'lit') {
      await this.addDevDependencies(['lit']);
      await this.addPeerDependencies(['lit']);
    }

    if (framework === 'react') {
      await this.addDevDependencies(['react', 'react-dom', 'react-test-renderer']);
      await this.addPeerDependencies(['react']);
    }
  }
}
