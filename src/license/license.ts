import Generator from '../generator.js';
import firstCommit from '../utils/first-commit.js';

export default class LicenseGenerator extends Generator {
  public async configuring(): Promise<void> {
    const commit = firstCommit();

    if (commit !== null) {
      const year = new Date(commit.date).getFullYear();

      const options = {
        authorName: commit.author,
        year,
      };

      await this.renderTpl('LICENSE', 'LICENSE', options);
    }
  }
}
