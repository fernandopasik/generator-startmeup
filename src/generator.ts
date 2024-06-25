/* eslint-disable max-lines */
import axios from 'axios';
// eslint-disable-next-line import/namespace, import/default
import gitRemote from 'git-remote-origin-url';
import { globbySync } from 'globby';
import parseGithub from 'parse-github-url';
import type { PackageJson } from 'type-fest';
// eslint-disable-next-line import/no-unresolved
import Generator from 'yeoman-generator';
import format from './utils/format.js';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export default class extends Generator {
  public async renderTpl(...parameters: Parameters<Generator['renderTemplate']>): Promise<void> {
    this.renderTemplate(...parameters);

    await this.formatFile(parameters[1] as string);
  }

  public async formatFile(filename: string): Promise<void> {
    const config = this.readDestination(filename, { defaults: '' }) as string;
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
        ts: this.hasAnyDependency('typescript'),
        tsx: this.hasAnyDependency('typescript') && this.hasAnyDependency('react'),
      },
    };

    // eslint-disable-next-line security/detect-object-injection
    return Object.keys(extensions[group] ?? {}).filter(
      // eslint-disable-next-line security/detect-object-injection
      (extension) => extensions[group]?.[extension],
    );
  }

  public async getGitRemote(): Promise<string | null> {
    let gitUrl = this.config.get('gitUrl');

    if (typeof gitUrl === 'string') {
      return gitUrl;
    }

    try {
      gitUrl = await gitRemote();
    } catch (error: unknown) {
      gitUrl = null;
    }

    return gitUrl;
  }

  public async getGitHub(): Promise<{ owner: string; repo: string } | null> {
    let info = null;

    const gitUrl = await this.getGitRemote();

    if (gitUrl !== null) {
      const githubInfo = parseGithub(gitUrl);

      if (githubInfo?.name !== null && githubInfo?.owner !== null && githubInfo !== null) {
        const { owner, name } = githubInfo;

        info = { owner, repo: name };
      }
    }

    return info;
  }

  public async getNpmName(): Promise<string | null> {
    const name = this.packageJson.get('name') as PackageJson['name'];

    let npmName = null;

    if (typeof name !== 'undefined') {
      try {
        await axios.get(`https://www.npmjs.com/package/${name}`);
        npmName = name;
      } catch {
        npmName = null;
      }
    }

    return npmName;
  }

  public getPackageManager(): PackageManager | null {
    if (this.hasFiles('pnpm-lock.yaml')) {
      return 'pnpm';
    } else if (this.hasFiles('yarn.lock')) {
      return 'yarn';
    } else if (this.hasFiles('package-lock.json')) {
      return 'npm';
    }

    return null;
  }

  public isNpmPackage(): boolean {
    return typeof this.packageJson.get('name') !== 'undefined';
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
    return globbySync(this.destinationPath(pattern), { dot: true, gitignore: true }).length > 0;
  }

  public fileIncludes(filepath: string, searchString: string): boolean {
    if (!this.fs.exists(filepath)) {
      return false;
    }

    const fileContent = this.fs.read(filepath);

    return fileContent?.includes(searchString) ?? false;
  }

  public async addAnyDependencies(
    dependencies: Record<string, string> | string[] | string,
    type = 'dependencies',
  ): Promise<Record<string, string>> {
    // eslint-disable-next-line no-underscore-dangle
    const resolved = await this._resolvePackageJsonDependencies(dependencies);
    const filtered = Object.fromEntries(
      Object.entries(resolved).filter(
        ([name]: string[]) =>
          typeof this.packageJson.getPath(`${type}.${name}`) === 'undefined' &&
          typeof this.packageJson.getPath(`dependencies.${name}`) === 'undefined',
      ),
    );

    this.packageJson.merge({ [type]: filtered });

    return filtered;
  }

  public async addPeerDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    return this.addAnyDependencies(dependencies, 'peerDependencies');
  }

  public override async addDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    return this.addAnyDependencies(dependencies);
  }

  public override async addDevDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    return this.addAnyDependencies(dependencies, 'devDependencies');
  }

  public override async _resolvePackageJsonDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    // eslint-disable-next-line no-underscore-dangle
    const resolved: Record<string, string> = await super._resolvePackageJsonDependencies(
      dependencies,
    );

    const last = Object.fromEntries(
      Object.entries(resolved).map(([name, version]: [string, string]) =>
        version.startsWith('^') ? [name, version] : [name, `^${version}`],
      ),
    );

    return last;
  }
}
