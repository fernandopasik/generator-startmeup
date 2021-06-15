import Generator from '../generator';
import firstCommit from '../utils/first-commit';

export default class LicenseGenerator extends Generator {
  public configuring(): void {
    const commit = firstCommit();

    if (commit !== null) {
      const year = new Date(commit.date).getFullYear();

      const options = {
        authorName: commit.author,
        year,
      };

      this.renderTemplate('LICENSE', 'LICENSE', options);
    }
  }
}
