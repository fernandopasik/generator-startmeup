import parseGithub from 'parse-github-url';
import Generator from '../generator';

export default class DocsGenerator extends Generator {
  public async writing(): Promise<void> {
    const { owner: githubOrg, name: githubRepo } =
      parseGithub((await this.getGitRemote()) ?? '') ?? {};

    const options = {
      circleCi: this.hasFiles('.circleci'),
      codeCov: this.hasDevDependency('codecov'),
      commitlint: this.hasDevDependency('@commitlint/cli'),
      eslint: this.hasDevDependency('eslint'),
      githubOrg,
      githubRepo,
      prettier: this.hasDevDependency('prettier'),
    };

    await this.renderTpl('CODE_OF_CONDUCT.md', 'CODE_OF_CONDUCT.md', options);
    await this.renderTpl('CONTRIBUTING.md', 'CONTRIBUTING.md', options);
  }
}
