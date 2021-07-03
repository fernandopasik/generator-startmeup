import type { PackageJson } from 'type-fest';
import Generator from '../generator';
import packageOptions from './package-options';

export default class SrcGenerator extends Generator {
  private isLibrary = false;

  public async prompting(): Promise<void> {
    const files = this.packageJson.get('files') as PackageJson['files'];

    const hasLibFolder =
      this.hasFiles('/lib') && typeof files !== 'undefined' && files.includes('/lib');

    const { library } = await this.prompt<{ library: boolean }>({
      name: 'library',
      type: 'confirm',
      message: 'Are you writing a library?',
      default: hasLibFolder,
    });

    this.isLibrary = library;
  }

  public writing(): void {
    const name = this.packageJson.get('name') as PackageJson['name'];

    if (typeof name === 'undefined') {
      return;
    }

    const hasYeoman = this.hasDependency('yeoman-generator');

    const packageProps = packageOptions(
      name,
      this.isLibrary,
      this.hasDevDependency('typescript'),
      this.hasAnyDependency('lit'),
      hasYeoman,
    );

    this.packageJson.merge(packageProps);

    const filename = this.isLibrary ? name : 'app';
    const extension = this.getSrcExtension();

    const mainFile = `src/${filename}${hasYeoman ? '/index' : ''}.${extension}`;

    if (!this.fs.exists(this.destinationPath(mainFile))) {
      this.fs.write(this.destinationPath(mainFile), '');
    }
  }
}
