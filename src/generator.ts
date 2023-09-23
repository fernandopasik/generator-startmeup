/* eslint-disable max-lines */
import axios from 'axios';
import { globSync } from 'fast-glob';
import gitconfiglocal from 'gitconfiglocal';
import { readFileSync } from 'node:fs';
import { promisify } from 'node:util';
import parseGithub from 'parse-github-url';
import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import format from './utils/format.js';

const getGitConfig = promisify(gitconfiglocal);

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export default class extends Generator {
  public async renderTpl(...parameters: Parameters<Generator['renderTemplate']>): Promise<void> {
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
        ts: this.hasAnyDependency('typescript'),
        tsx: this.hasAnyDependency('typescript') && this.hasAnyDependency('react'),
      },
    };

    // eslint-disable-next-line security/detect-object-injection
    return Object.keys(extensions[group]).filter((extension) => extensions[group][extension]);
  }

  public async getGitRemote(): Promise<string | null> {
    let gitUrl = this.config.get('gitUrl') as string | null;

    if (typeof gitUrl === 'string') {
      return gitUrl;
    }

    try {
      const gitConfig = await getGitConfig(process.cwd());
      gitUrl = gitConfig?.remote?.['origin']?.url;
    } catch (e: unknown) {
      gitUrl = null;
    }

    return gitUrl;
  }

  public async getGitHub(): Promise<{ owner: string; repo: string } | null> {
    let info = null;

    const gitConfig = await getGitConfig(process.cwd());
    const gitUrl = gitConfig?.remote?.['origin']?.url;

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
    const defaultIgnores = ['**/node_modules', '**/.git'];
    const gitIgnoreFile = readFileSync('.gitignore');
    const gitIgnorePaths = gitIgnoreFile
      .toString('utf8')
      .split('\n')
      .filter((line) => !line.startsWith('#') && line !== '')
      .map((item) => (item.startsWith('/') ? item.slice(1) : item))
      .map((item) => this.destinationPath(item));
    const ignorePaths = [...defaultIgnores, ...gitIgnorePaths];
    const paths = globSync(this.destinationPath(pattern), { dot: true, ignore: ignorePaths });
    return paths.length > 0;
  }

  public fileIncludes(filepath: string, searchString: string): boolean {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!this.fs.exists(filepath)) {
      return false;
    }

    const fileContent = this.fs.read(filepath);

    return fileContent.includes(searchString);
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

  public async addDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    return this.addAnyDependencies(dependencies);
  }

  public async addDevDependencies(
    dependencies: Record<string, string> | string[] | string,
  ): Promise<Record<string, string>> {
    return this.addAnyDependencies(dependencies, 'devDependencies');
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
      Object.entries(resolved).map(([name, version]: string[]) =>
        !version.startsWith('^') ? [name, `^${version}`] : [name, version],
      ),
    );

    return last;
  }
}
