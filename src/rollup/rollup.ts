import type { PackageJson } from 'type-fest';
import Generator from '../generator.ts';

export default class RollupGenerator extends Generator {
  public async configuring(): Promise<void> {
    const files = this.packageJson.get('files') as PackageJson['files'];
    const hasLibFolder = this.hasFiles('src/lib') || (files?.includes('/lib') ?? false);

    if (!hasLibFolder) {
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
