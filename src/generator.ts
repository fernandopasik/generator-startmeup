import globby from 'globby';
import prettier from 'prettier';
import * as prettierPluginPackageJson from 'prettier-plugin-packagejson';
import type { JsonObject } from 'type-fest';
import Generator from 'yeoman-generator';
import sortProps from './sort-props';

interface Answers {
  confirm: boolean;
}

export default class extends Generator {
  public async confirm(message: string, defaultValue = true): Promise<boolean> {
    const { confirm } = await this.prompt<Answers>([
      {
        type: 'confirm',
        name: 'confirm',
        message,
        default: defaultValue,
      },
    ]);

    return confirm;
  }

  public async formatFile(filename: string): Promise<void> {
    const config = this.readDestination(filename);

    const cleanConfig = config.replace(/[\s]*\/\//g, '');
    let formattedConfig = await this.format(cleanConfig, filename);

    if (/.json$/.exec(filename)) {
      const JSON_SPACING = 2;
      let spaces = 0;

      const jsonConfig = sortProps(JSON.parse(formattedConfig) as JsonObject, [
        'extends',
        'files',
        'error',
      ]);
      if (Object.keys(jsonConfig).length <= JSON_SPACING) {
        spaces = JSON_SPACING;
      }
      formattedConfig = await this.format(JSON.stringify(jsonConfig, null, spaces), filename);
    }

    this.writeDestination(filename, formattedConfig);
  }

  public async format(content: string, filepath: string): Promise<string> {
    const prettierConfig = await prettier.resolveConfig(this.destinationRoot());

    return prettier.format(content, {
      ...prettierConfig,
      filepath,
      plugins: [prettierPluginPackageJson],
    });
  }

  public getJsExtensions(): string[] {
    const extensions = [];

    if (this.hasFiles('**/*.js')) {
      extensions.push('js');
    }

    if (this.hasAnyDependency('react')) {
      extensions.push('jsx');
    }

    if (this.hasDevDependency('typescript')) {
      extensions.push('ts');

      if (this.hasAnyDependency('react')) {
        extensions.push('tsx');
      }
    }

    return extensions.sort((a, b) => a.localeCompare(b));
  }

  public getCssExtensions(): string[] {
    const extensions = [];

    if (this.hasFiles('**/*.css')) {
      extensions.push('css');
    }

    if (this.hasFiles('**/*.scss')) {
      extensions.push('scss');
    }

    return extensions.sort((a, b) => a.localeCompare(b));
  }

  public hasDependency(name: string): boolean {
    return typeof this.packageJson.getPath(`dependencies.${name}`) !== 'undefined';
  }

  public hasDevDependency(name: string): boolean {
    return typeof this.packageJson.getPath(`devDependencies.${name}`) !== 'undefined';
  }

  public hasAnyDependency(name: string): boolean {
    return this.hasDependency(name) || this.hasDevDependency(name);
  }

  public hasFiles(pattern: string): boolean {
    return globby.sync(this.destinationPath(pattern), { dot: true, gitignore: true }).length > 0;
  }

  public async addPeerDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    // eslint-disable-next-line no-underscore-dangle
    const peerDependencies = await this._resolvePackageJsonDependencies(dependencies);
    this.packageJson.merge({ peerDependencies });

    return peerDependencies;
  }

  // eslint-disable-next-line no-underscore-dangle
  protected async _resolvePackageJsonDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    // @ts-expect-error no type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, no-underscore-dangle
    const resolved = (await super._resolvePackageJsonDependencies(dependencies)) as Record<
      string,
      string
    >;

    const last = Object.fromEntries(
      Object.entries(resolved).map(([name, version]: Readonly<string[]>) =>
        !version.startsWith('^') ? [name, `^${version}`] : [name, version],
      ),
    );

    return last;
  }
}
