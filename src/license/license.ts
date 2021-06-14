import Generator from '../generator';
import { parseAuthor } from '../packagejson';
import firstCommit from '../utils/first-commit';

export default class LicenseGenerator extends Generator {
  public configuring(): void {
    const author = this.packageJson.get('author') as string;
    const { name: authorName } = parseAuthor(author);

    const commit = firstCommit();

    if (commit !== null) {
      const year = new Date(commit.date).getFullYear();

      const options = {
        authorName,
        year,
      };

      this.renderTemplate('LICENSE', 'LICENSE', options);
    }
  }
}
