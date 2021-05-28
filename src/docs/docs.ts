import gitRemote from 'git-remote-origin-url';
import parseGithub from 'parse-github-url';
// import type { PackageJson } from 'type-fest';
import Generator from '../generator';
// import { parseYear } from '../license';
// import { parseAuthor } from '../packagejson/parse';

export default class DocsGenerator extends Generator {
  public async writing(): Promise<void> {
    // const { name, description, author, license } = this.packageJson.getAll() as PackageJson;

    // const authorInfo = parseAuthor(author as string);
    // const licenseFile = this.readDestination('LICENSE');
    const gitUrl = await gitRemote();

    const { owner: githubOrg, name: githubRepo } = parseGithub(gitUrl) ?? {};

    const options = {
      circleCi: this.hasFiles('.circleci'),
      codeCov: this.hasDevDependency('codecov'),
      commitlint: this.hasDevDependency('@commitlint/cli'),
      eslint: this.hasDevDependency('eslint'),
      githubOrg,
      githubRepo,
      prettier: this.hasDevDependency('prettier'),
    };

    this.renderTemplate('CODE_OF_CONDUCT.md', 'CODE_OF_CONDUCT.md', options);
    this.renderTemplate('CONTRIBUTING.md', 'CONTRIBUTING.md', options);
  }
}
