import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';
import { parseAuthor } from '../utils/author-package.js';
import firstCommit from '../utils/first-commit.js';

export default class ReadmeGenerator extends Generator {
  public async writing(): Promise<void> {
    if (this.existsDestination('README.md')) {
      return;
    }

    const { name, description, author, license } = this.packageJson.getAll() as PackageJson;

    const { name: authorName, url: authorUrl } = parseAuthor(author as string);

    const commit = firstCommit();

    let year = '';

    if (commit !== null) {
      year = String(new Date(commit.date).getFullYear());
    }

    const options = { authorName, authorUrl, description, license, name, year };

    await this.renderTpl('README.md', 'README.md', options);
  }
}
