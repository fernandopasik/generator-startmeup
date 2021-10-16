import Generator from '../generator.js';

const FRAMEWORKS = ['none', 'lit', 'react'];

export default class LibrariesGenerator extends Generator {
  public async prompting(): Promise<void> {
    const { framework } = await this.prompt<{ framework: string }>([
      {
        type: 'list',
        name: 'framework',
        message: 'Which framework do you want to use?',
        choices: FRAMEWORKS,
        default: FRAMEWORKS.find((frameworkName) => this.hasAnyDependency(frameworkName)),
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
