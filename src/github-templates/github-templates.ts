import Generator from '../generator';

export default class GithubTemplatesGenerator extends Generator {
  public configuring(): void {
    this.copyTemplate('PULL_REQUEST_TEMPLATE.md', '.github/PULL_REQUEST_TEMPLATE.md');
    this.copyTemplate('ISSUE_TEMPLATE/bug_report.md', '.github/ISSUE_TEMPLATE/bug_report.md');
    this.copyTemplate(
      'ISSUE_TEMPLATE/feature_request.md',
      '.github/ISSUE_TEMPLATE/feature_request.md',
    );
  }
}
