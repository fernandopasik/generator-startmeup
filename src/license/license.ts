import Generator from '../generator';
import { parseAuthor } from '../packagejson';

export const parseYear = (license = ''): string => {
  const [year = null] = /20\d\d/.exec(license) ?? [];

  return year ?? `${new Date().getFullYear()}`;
};

export default class LicenseGenerator extends Generator {
  public configuring(): void {
    const author = this.packageJson.get('author') as string;
    const { name: authorName } = parseAuthor(author);

    const existent = this.existsDestination('LICENSE') ? this.readDestination('LICENSE') : '';

    const options = {
      authorName,
      year: parseYear(existent),
    };

    this.renderTemplate('LICENSE', 'LICENSE', options);
  }
}
