import { type PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class TypescriptGenerator extends Generator {
  public async configuring(): Promise<void> {
    const build = `tsc -p tsconfig.build.json${
      this.hasAnyDependency('rollup') ? ' && rollup -c' : ''
    }`;

    this.packageJson.merge({
      scripts: {
        'check-types': 'tsc --noEmit',
        build,
      },
    });

    if (!this.hasAnyDependency('typescript') || !this.hasDevDependency('@tsconfig/strictest')) {
      await this.addDevDependencies(['typescript', '@tsconfig/strictest']);
    }
  }

  public async writing(): Promise<void> {
    const packageFiles = (this.packageJson.get('files') as PackageJson['files']) ?? [];
    const packageScripts = (this.packageJson.get('scripts') as PackageJson['scripts']) ?? {};

    const hasTests = Boolean(packageScripts.test);
    const hasCoverage = JSON.stringify(packageScripts).includes('coverage');

    const excludedFiles = packageFiles.map((packageFile) => packageFile.replace(/^\//, ''));
    const exclude = [...excludedFiles];

    if (this.hasDevDependency('flow-bin')) {
      exclude.push('**/*.flow');
    }

    if (hasCoverage) {
      exclude.push('/coverage');
    }

    const options = {
      excludeFiles: exclude.map((file) => `"${file}"`).join(','),
      flow: this.hasDevDependency('flow-bin'),
      hasTests,
      jest: this.hasDevDependency('jest'),
      lit: this.hasAnyDependency('lit'),
      module: this.packageJson.get('type') === 'module' ? 'ESNext' : 'commonjs',
      outDir: excludedFiles.includes('lib') ? '.' : excludedFiles[0],
      puppeteer: this.hasDevDependency('puppeteer'),
      react: this.hasAnyDependency('react'),
      storybook:
        this.hasDevDependency('@storybook/react') ||
        this.hasDevDependency('@storybook/web-components'),
    };

    await this.renderTpl('tsconfig.json', 'tsconfig.json', options, { rmWhitespace: true });
    await this.renderTpl('tsconfig.build.json', 'tsconfig.build.json', options, {
      rmWhitespace: true,
    });
  }
}
