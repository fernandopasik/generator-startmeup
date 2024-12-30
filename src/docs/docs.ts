import Generator from '../generator.ts';

export default class DocsGenerator extends Generator {
  public async writing(): Promise<void> {
    const { owner: githubOrg, repo: githubRepo } = (await this.getGitHub()) ?? {};

    const options = {
      circleCi: this.hasFiles('.circleci'),
      codeCov: this.fileIncludes('.github/workflows/main.yml', 'codecov'),
      commitlint: this.hasAnyDependency('@commitlint/cli'),
      eslint: this.hasAnyDependency('eslint'),
      githubOrg,
      githubRepo,
      prettier: this.hasAnyDependency('prettier'),
    };

    await this.renderTpl('CONTRIBUTING.md', 'CONTRIBUTING.md', options);
  }
}
