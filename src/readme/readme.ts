import gitRemote from 'git-remote-origin-url';
import parseGithub from 'parse-github-url';
import type { PackageJson } from 'type-fest';
import Generator from '../generator';
import { parseYear } from '../license';
import { parseAuthor } from '../packagejson/parse';

export default class ReadmeGenerator extends Generator {
  public async writing(): Promise<void> {
    const { name, description, author, license } = this.packageJson.getAll() as PackageJson;

    const authorInfo = parseAuthor(author as string);
    const licenseFile = this.readDestination('LICENSE');
    const gitUrl = await gitRemote();

    const { owner: githubOrg, name: githubRepo } = parseGithub(gitUrl) ?? {};

    const options = {
      name,
      description,
      allContributors: this.hasDevDependency('all-contributors'),
      authorName: authorInfo.name,
      authorUrl: authorInfo.url,
      circleCi: this.hasFiles('.circleci'),
      codeCov: this.hasDevDependency('codecov'),
      githubOrg,
      githubRepo,
      license,
      npm: !((this.packageJson.get('private') as PackageJson['private']) ?? false),
      sec: true,
      size: this.hasDevDependency('bundlesize') || this.hasDevDependency('bundlewatch'),
      year: parseYear(licenseFile),
    };

    this.renderTemplate('README.md', 'README.md', options);
  }
}