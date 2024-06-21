import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';
import packageOptions from './package-options.js';

export default class SrcGenerator extends Generator {
  private isLibrary = false;

  public async prompting(): Promise<void> {
    const files = this.packageJson.get('files') as PackageJson['files'];

    const hasLibFolder =
      this.hasFiles('src/lib') || (typeof files !== 'undefined' && files.includes('/lib'));

    this.isLibrary = hasLibFolder;

    if (typeof files === 'undefined') {
      const { library } = await this.prompt<{ library: boolean }>({
        name: 'library',
        type: 'confirm',
        message: 'Are you writing a library?',
        default: hasLibFolder,
      });

      this.isLibrary = library;
    }
  }

  public configuring(): void {
    const name = this.packageJson.get('name') as PackageJson['name'];

    if (typeof name === 'undefined') {
      return;
    }

    const hasYeoman = this.hasDependency('yeoman-generator');

    const packageProps = packageOptions(
      name,
      this.isLibrary,
      this.packageJson.get('type') === 'module',
      this.hasAnyDependency('typescript'),
      hasYeoman,
    );

    this.packageJson.merge(packageProps);

    const filename = this.isLibrary ? name : 'app';
    const extension = this.hasAnyDependency('typescript') ? 'ts' : 'js';

    const mainFile = `src/${filename}${hasYeoman ? '/index' : ''}.${extension}`;

    if (!this.hasFiles(mainFile)) {
      this.fs.write(this.destinationPath(mainFile), '');
    }
  }
}
