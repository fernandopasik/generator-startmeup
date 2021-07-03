import type { PackageJson } from 'type-fest';
import Generator from '../generator';
import packageOptions from './package-options';

export default class SrcGenerator extends Generator {
  private isLibrary = false;

  public async prompting(): Promise<void> {
    const files = this.packageJson.get('files') as PackageJson['files'];

    const hasLibFolder =
      this.hasFiles('/lib') && typeof files !== 'undefined' && files.includes('/lib');

    this.isLibrary = await this.prompt<boolean>({
      name: 'library',
      type: 'confirm',
      message: 'Are you writing a library?',
      default: hasLibFolder,
    });
  }

  public writing(): void {
    const name = this.packageJson.get('name') as PackageJson['name'];

    if (typeof name === 'undefined') {
      return;
    }

    const packageProps = packageOptions(
      name,
      this.isLibrary,
      this.hasDevDependency('typescript'),
      this.hasAnyDependency('lit'),
      this.hasDependency('yeoman-generator'),
    );

    this.packageJson.merge(packageProps);

    const mainFile = `src/${this.isLibrary ? name : 'app'}.${this.getSrcExtension()}`;

    if (!this.fs.exists(this.destinationPath(mainFile))) {
      this.fs.write(this.destinationPath(mainFile), '');
    }
  }
}
