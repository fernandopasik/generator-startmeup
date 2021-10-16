import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';

export default class TypescriptGenerator extends Generator {
  public async configuring(): Promise<void> {
    this.packageJson.merge({
      scripts: {
        'check-types': 'tsc --noEmit',
        build: 'tsc -p tsconfig.build.json',
      },
    });

    if (!this.hasAnyDependency('typescript')) {
      await this.addDevDependencies(['typescript']);
    }
  }

  public async writing(): Promise<void> {
    const packageFiles = (this.packageJson.get('files') as PackageJson['files']) ?? [];
    const exclude = [...packageFiles];

    if (this.hasDevDependency('flow-bin')) {
      exclude.push('**/*.flow');
    }

    const options = {
      excludeFiles: exclude.map((file) => `"${file}"`).join(','),
      flow: this.hasDevDependency('flow-bin'),
      jest: this.hasDevDependency('jest'),
      jestEnzyme: this.hasDevDependency('jest-enzyme'),
      module: this.packageJson.get('type') === 'module' ? 'ESNext' : 'commonjs',
      outDir: packageFiles.includes('/lib') ? '.' : packageFiles[0]?.replace(/^\//g, ''),
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
