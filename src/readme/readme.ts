import type { PackageJson } from 'type-fest';
import Generator from '../generator';
import { parseYear } from '../license';
import { parseAuthor } from '../packagejson/parse';

export default class ReadmeGenerator extends Generator {
  public writing(): void {
    const { name, description, author, license } = this.packageJson.getAll() as PackageJson;

    const authorInfo = parseAuthor(author as string);
    const licenseFile = this.readDestination('LICENSE');

    const options = {
      name,
      description,
      authorName: authorInfo.name,
      authorUrl: authorInfo.url,
      license,
      year: parseYear(licenseFile),
    };

    this.renderTemplate('README.md', 'README.md', options);
  }
}
