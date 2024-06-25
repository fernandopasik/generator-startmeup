import parseGithub from 'parse-github-url';
import path from 'path';
import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';
import { composeAuthor, parseAuthor } from '../utils/author-package.js';

interface Answers {
  name: string;
  description?: string;
  authorName?: string;
  authorEmail?: string;
  authorUrl?: string;
  license?: string;
}

const LICENSES = ['MIT', 'UNLICENSED'];
const [DEFAULT_LICENSE] = LICENSES;

export default class PackageJsonGenerator extends Generator {
  private answers!: Answers;

  // eslint-disable-next-line max-lines-per-function
  public async prompting(): Promise<void> {
    const {
      name = path.basename(process.cwd()),
      description,
      author,
      license,
    } = this.packageJson.getAll() as PackageJson;
    const { name: authorName, email: authorEmail, url: authorUrl } = parseAuthor(author);

    if (
      typeof this.option('all') !== 'undefined' &&
      typeof this.packageJson.get('name') !== 'undefined'
    ) {
      this.answers = Object.fromEntries(
        [
          ['name', name],
          ['description', description],
          ['authorName', authorName],
          ['authorEmail', authorEmail],
          ['authorUrl', authorUrl],
          ['license', license],
        ].filter((option) => Boolean(option[1])),
      ) as Answers;
      return;
    }

    this.answers = await this.prompt<Answers>([
      {
        default: (): string => name,
        message: "What is your app's name?",
        name: 'name',
        type: 'input',
      },
      {
        default: description,
        message: "What is your app's description?",
        name: 'description',
        type: 'input',
      },
      {
        default: async (): Promise<string> => authorName ?? (await this.git.name()) ?? '',
        message: 'What is your name?',
        name: 'authorName',
        type: 'input',
      },
      {
        default: async (): Promise<string> => authorEmail ?? (await this.git.email()) ?? '',
        message: 'What is your email?',
        name: 'authorEmail',
        type: 'input',
        when: (props: Answers): boolean => Boolean(props.authorName),
      },
      {
        default: authorUrl,
        message: 'What is your url?',
        name: 'authorUrl',
        type: 'input',
        when: (props: Answers): boolean => Boolean(props.authorName),
      },
      {
        choices: LICENSES,
        default: license ?? DEFAULT_LICENSE,
        message: 'What kind of license do you want?',
        name: 'license',
        type: 'list',
      },
    ]);
  }

  // eslint-disable-next-line max-lines-per-function
  public async configuring(): Promise<void> {
    const { authorName, authorEmail, authorUrl, ...mainProps } = this.answers;

    const { name } = mainProps;

    let repository = '';

    try {
      const gitUrl = (await this.getGitRemote()) ?? '';
      repository = gitUrl;
      const { owner: githubOrg, name: githubRepo } = parseGithub(gitUrl) ?? {};

      if (
        githubOrg !== null &&
        typeof githubOrg !== 'undefined' &&
        githubRepo !== null &&
        typeof githubRepo !== 'undefined'
      ) {
        repository = `${githubOrg}/${githubRepo}`;
      }
    } catch {
      repository = `${await this.github.username()}/${name}`;
    }

    const authorProps = Object.fromEntries(
      [
        ['name', authorName],
        ['email', authorEmail],
        ['url', authorUrl],
      ].filter((option) => Boolean(option[1])),
    ) as Exclude<PackageJson.Person, string>;

    const packageJson = {
      ...mainProps,
      author: composeAuthor(authorProps),
      repository,
    };

    this.packageJson.merge(packageJson);

    await this.formatFile('package.json');
  }
}
