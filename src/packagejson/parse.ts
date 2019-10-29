import { isEmpty, isEqual, isUndefined, omitBy } from 'lodash';
import { PackageJson, Person } from './package-json';

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

const parse = (pkg: PackageJson): Parsed => {
  const { name, version, description, author, repository, license } = pkg;

  let parsedAuthor: Person | undefined;

  if (typeof author === 'string') {
    parsedAuthor = {};
    parsedAuthor.name = author.replace(/\s?[(<].*/g, '');
    [, parsedAuthor.email = undefined] = /<([^>]+)>/.exec(author) || [];
    [, parsedAuthor.url = undefined] = /\(([^)]+)\)/.exec(author) || [];
  } else {
    parsedAuthor = author;
  }

  let repoUrl: string | undefined;

  if (typeof repository === 'object') {
    repoUrl = repository.url;
  } else {
    repoUrl = repository;
  }

  const isGitRepo = typeof repoUrl !== 'undefined' && repoUrl.includes('github.com');

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

  return (omitBy(
    parsed,
    (item: string | object): boolean => isUndefined(item) || isEqual(item, {}),
  ) as unknown) as Parsed;
};

export default parse;
