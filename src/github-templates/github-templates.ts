import Generator from '../generator';

export default class GithubTemplatesGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.renderTpl('PULL_REQUEST_TEMPLATE.md', '.github/PULL_REQUEST_TEMPLATE.md');
    await this.renderTpl('ISSUE_TEMPLATE/bug_report.md', '.github/ISSUE_TEMPLATE/bug_report.md');
    await this.renderTpl(
      'ISSUE_TEMPLATE/feature_request.md',
      '.github/ISSUE_TEMPLATE/feature_request.md',
    );
  }
}
