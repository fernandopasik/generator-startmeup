import globby from 'globby';
import Generator from 'yeoman-generator';
import format from './utils/format';

export default class extends Generator {
  public async renderTpl(
    ...parameters: Readonly<Parameters<Generator['renderTemplate']>>
  ): Promise<void> {
    this.renderTemplate(...parameters);

    await this.formatFile(parameters[1] as string);
  }

  public async formatFile(filename: string): Promise<void> {
    const config = this.readDestination(filename);
    const formattedConfig = await format(config, filename, this.destinationRoot());
    this.writeDestination(filename, formattedConfig);
  }

  public getExtensions(group = 'js'): string[] {
    const extensions: Record<string, Record<string, boolean>> = {
      css: {
        css: this.hasFiles('**/*.css'),
        scss: this.hasFiles('**/*.scss'),
      },
      js: {
        js: this.hasFiles('**/*.js'),
        jsx: this.hasAnyDependency('react'),
        ts: this.hasDevDependency('typescript'),
        tsx: this.hasDevDependency('typescript') && this.hasAnyDependency('react'),
      },
    };

    return Object.keys(extensions[group]).filter((extension) => extensions[group][extension]);
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
