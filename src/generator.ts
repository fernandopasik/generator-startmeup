import Generator from 'yeoman-generator';

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

  public getJsExtensions(): string[] {
    const extensions = ['js'];

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

  public hasDependency(name: string): boolean {
    return typeof this.packageJson.getPath(`dependencies.${name}`) !== 'undefined';
  }

  public hasDevDependency(name: string): boolean {
    return typeof this.packageJson.getPath(`devDependencies.${name}`) !== 'undefined';
  }

  public hasAnyDependency(name: string): boolean {
    return this.hasDependency(name) || this.hasDevDependency(name);
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
