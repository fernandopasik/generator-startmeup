import Generator from '../generator';
import { parseAuthor } from '../packagejson/parse';

export default class LicenseGenerator extends Generator {
  public configuring(): void {
    const author = this.packageJson.get('author') as string;
    const { name: authorName } = parseAuthor(author);

    const existent = this.readDestination('LICENSE');
    const [year = null] = /20\d\d/.exec(existent) ?? [];

    const options = {
      authorName,
      year: year ?? new Date().getFullYear(),
    };

    this.renderTemplate('LICENSE', 'LICENSE', options);
  }
}
