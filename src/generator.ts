import globby from 'globby';
import Generator from 'yeoman-generator';
import cleanupTemplate from './utils/cleanup-template';
import formatJson from './utils/format-json';
import hasExtension from './utils/has-extension';
import prettierFormat from './utils/prettier-format';

export default class extends Generator {
  public async formatFile(filename: string): Promise<void> {
    const config = this.readDestination(filename);

    const cleanConfig = cleanupTemplate(config);
    let formattedConfig = await prettierFormat(cleanConfig, filename, this.destinationRoot());

    if (hasExtension(filename, 'json')) {
      formattedConfig = await formatJson(formattedConfig, filename, this.destinationRoot());
    }

    this.writeDestination(filename, formattedConfig);
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
