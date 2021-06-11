import Generator from '../generator';
import { parseAuthor } from '../packagejson';

export default class LicenseGenerator extends Generator {
  public configuring(): void {
    const author = this.packageJson.get('author') as string;
    const { name: authorName } = parseAuthor(author);

    const options = {
      authorName,
      year: this.getFirstCommitYear(),
    };

    this.renderTemplate('LICENSE', 'LICENSE', options);
  }
}
