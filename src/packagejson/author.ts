import type { PackageJson } from 'type-fest';

interface Person {
  name?: string;
  url?: string;
  email?: string;
}

export const parseAuthor = (authorInfo?: PackageJson.Person): Person => {
  if (typeof authorInfo === 'undefined') {
    return {};
  }

  if (typeof authorInfo !== 'string') {
    return authorInfo;
  }

  const author: PackageJson.Person = {
    name: authorInfo.replaceAll(/\s?[(<].*/g, ''),
  };
  [, author.email = undefined] = /<([^>]+)>/.exec(authorInfo) ?? [];
  [, author.url = undefined] = /\(([^)]+)\)/.exec(authorInfo) ?? [];

  return author;
};

export const composeAuthor = (author: Person = {}): string =>
  `${author.name ?? ''} <${author.email ?? ''}> (${author.url ?? ''})`
    .replace(' <>', '')
    .replace(' ()', '')
    .trim();
