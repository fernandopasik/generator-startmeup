import parseGithub from 'parse-github-url';
import path from 'path';
import type { PackageJson } from 'type-fest';
import Generator from '../generator.js';
import { composeAuthor, parseAuthor } from './author.js';

interface Answers {
  name: string;
  description: string;
  authorName: string;
  authorEmail: string;
  authorUrl: string;
  license: string;
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
        default: (): string => authorName ?? this.user.git.name(),
      },
      {
        name: 'authorEmail',
        type: 'input',
        message: 'What is your email?',
        default: (): string => authorEmail ?? this.user.git.email(),
        when: (props: Readonly<Answers>): boolean => Boolean(props.authorName),
      },
      {
        name: 'authorUrl',
        type: 'input',
        message: 'What is your url?',
        default: authorUrl,
        when: (props: Readonly<Answers>): boolean => Boolean(props.authorName),
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
    const { name, description, authorName, authorEmail, authorUrl, license } = this.answers;

    let repository: PackageJson['repository'] = '';

    try {
      const gitUrl = (await this.getGitRemote()) ?? '';
      repository = {
        type: 'git',
        url: gitUrl,
      };
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
      repository = `${await this.user.github.username()}/${name}`;
    }

    const packageJson = {
      name,
      description,
      author: composeAuthor({
        name: authorName,
        email: authorEmail,
        url: authorUrl,
      }),
      license,
      repository,
    };

    this.packageJson.merge(packageJson);

    await this.formatFile('package.json');
  }
}
