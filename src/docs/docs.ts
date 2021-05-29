import gitRemote from 'git-remote-origin-url';
import parseGithub from 'parse-github-url';
import Generator from '../generator';

export default class DocsGenerator extends Generator {
  public async writing(): Promise<void> {
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
