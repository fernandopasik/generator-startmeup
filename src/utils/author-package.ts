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
    name: authorInfo.replaceAll(/\s?[(<].*/gu, ''),
  };
  // eslint-disable-next-line prefer-named-capture-group
  const email = /<([^>]+)>/u.exec(authorInfo)?.pop();
  if (typeof email !== 'undefined') {
    author.email = email;
  }

  // eslint-disable-next-line prefer-named-capture-group
  const url = /\(([^)]+)\)/u.exec(authorInfo)?.pop();
  if (typeof url !== 'undefined') {
    author.url = url;
  }

  return author;
};

export const composeAuthor = (author: Person = {}): string =>
  `${author.name ?? ''} <${author.email ?? ''}> (${author.url ?? ''})`
    .replace(' <>', '')
    .replace(' ()', '')
    .trim();
