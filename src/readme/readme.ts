import type { PackageJson } from 'type-fest';
import Generator from '../generator';
import { parseAuthor } from '../packagejson';

export default class ReadmeGenerator extends Generator {
  public async writing(): Promise<void> {
    if (this.existsDestination('README.md')) {
      return;
    }

    const { name, description, author, license } = this.packageJson.getAll() as PackageJson;

    const authorInfo = parseAuthor(author as string);

    const options = {
      name,
      description,
      authorName: authorInfo.name,
      authorUrl: authorInfo.url,
      license,
      year: this.getFirstCommitYear(),
    };

    await this.renderTpl('README.md', 'README.md', options);
  }
}
