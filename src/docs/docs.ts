import Generator from '../generator.js';

export default class DocsGenerator extends Generator {
  public async writing(): Promise<void> {
    const { owner: githubOrg, repo: githubRepo } = (await this.getGitHub()) ?? {};

    const options = {
      circleCi: this.hasFiles('.circleci'),
      codeCov: this.fileIncludes('.github/workflows/main.yml', 'codecov'),
      commitlint: this.hasDevDependency('@commitlint/cli'),
      eslint: this.hasDevDependency('eslint'),
      githubOrg,
      githubRepo,
      prettier: this.hasDevDependency('prettier'),
    };

    await this.renderTpl('CONTRIBUTING.md', 'CONTRIBUTING.md', options);
  }
}
