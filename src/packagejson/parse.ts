import { isEmpty, isEqual, isUndefined, omitBy } from 'lodash';
import type { PackageJson, ReadonlyDeep } from 'type-fest';

export interface Person {
  name?: string;
  email?: string;
  url?: string;
}

export interface Parsed {
  name: string;
  version: string;
  description?: string;
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  github: boolean;
  githubUrl?: string;
  license?: string;
}

const parseAuthor = (authorInfo: string): Person => {
  const author: Person = {};
  author.name = authorInfo.replace(/\s?[(<].*/g, '');
  [, author.email = undefined] = /<([^>]+)>/.exec(authorInfo) ?? [];
  [, author.url = undefined] = /\(([^)]+)\)/.exec(authorInfo) ?? [];

  return author;
};

const parse = (pkg: ReadonlyDeep<PackageJson>): Parsed => {
  const { name, version, description, author, repository, license } = pkg;

  const parsedAuthor = typeof author === 'string' ? parseAuthor(author) : author;
  const repoUrl = typeof repository === 'object' ? repository.url : repository;
  const isGitRepo =
    typeof repoUrl !== 'undefined' && (repoUrl.includes('github.com') || !repoUrl.includes('://'));

  const parsed = {
    name,
    version,
    description,
    author: omitBy(parsedAuthor, isEmpty),
    github: isGitRepo,
    githubUrl:
      isGitRepo && typeof repoUrl !== 'undefined' ? repoUrl.replace(/.git$/, '') : undefined,
    license,
  };

  return omitBy(
    parsed,
    (item: Record<string, string> | string): boolean => isUndefined(item) || isEqual(item, {}),
  ) as unknown as Parsed;
};

export default parse;
