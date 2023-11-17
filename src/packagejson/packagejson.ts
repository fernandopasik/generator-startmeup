import parseGithub from 'parse-github-url';
import path from 'path';
import { type PackageJson } from 'type-fest';
import Generator from '../generator.js';
import { composeAuthor, parseAuthor } from './author.js';

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

export default class DocsGenerator extends Generator {
  private answers!: Answers;

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
      this.answers = { name, description, authorName, authorEmail, authorUrl, license };
      return;
    }

    this.answers = await this.prompt<Answers>([
      {
        name: 'name',
        type: 'input',
        message: "What is your app's name?",
        default: (): string => name,
      },
      {
        name: 'description',
        type: 'input',
        message: "What is your app's description?",
        default: description,
      },
      {
        name: 'authorName',
        type: 'input',
        message: 'What is your name?',
        default: async (): Promise<string> => authorName ?? (await this.git.name()) ?? '',
      },
      {
        name: 'authorEmail',
        type: 'input',
        message: 'What is your email?',
        default: async (): Promise<string> => authorEmail ?? (await this.git.email()) ?? '',
        when: (props: Answers): boolean => Boolean(props.authorName),
      },
      {
        name: 'authorUrl',
        type: 'input',
        message: 'What is your url?',
        default: authorUrl,
        when: (props: Answers): boolean => Boolean(props.authorName),
      },
      {
        name: 'license',
        type: 'list',
        message: 'What kind of license do you want?',
        choices: LICENSES,
        default: license ?? DEFAULT_LICENSE,
      },
    ]);
  }

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

    const packageJson = {
      ...mainProps,
      author: composeAuthor({
        name: authorName,
        email: authorEmail,
        url: authorUrl,
      }),
      repository,
    };

    this.packageJson.merge(packageJson);

    await this.formatFile('package.json');
  }
}
