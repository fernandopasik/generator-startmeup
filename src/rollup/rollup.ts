import type { PackageJson } from 'type-fest';
import Generator from '../generator';

export default class RollupGenerator extends Generator {
  public async configuring(): Promise<void> {
    const files = this.packageJson.get('files') as PackageJson['files'];
    const hasLibFolder =
      this.hasFiles('src/lib') || (typeof files !== 'undefined' && files.includes('/lib'));

    if (!hasLibFolder) {
      return;
    }

    if (
      !this.hasAnyDependency('lit') &&
      !this.hasAnyDependency('lit-html') &&
      !this.hasAnyDependency('react')
    ) {
      return;
    }

    const build = (this.packageJson.getPath('scripts.build') as string | undefined) ?? '';

    if (!build.includes('rollup')) {
      this.packageJson.merge({
        scripts: {
          build: `${build} && rollup -c`,
        },
      });
    }

    await this.addDevDependencies(['rollup']);
  }
}
