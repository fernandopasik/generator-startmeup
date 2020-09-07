import { isEmpty, omitBy } from 'lodash';
import type { PackageJson } from 'type-fest';
import type { Parsed } from './parse';

interface Author {
  name?: string;
  email?: string;
  url?: string;
}

const composeAuthor = (author: Readonly<Author> = {}): string =>
  `${author.name ?? ''} <${author.email ?? ''}> (${author.url ?? ''})`
    .replace(' <>', '')
    .replace(' ()', '')
    .trim();

interface RepoInfo {
  repository?: {
    type: string;
    url: string;
  };
  homepage?: string;
  bugs?: string;
}

const composeGithubUrl = (url: string): RepoInfo => ({
  repository: {
    type: 'git',
    url: `${url}.git`,
  },
  homepage: url,
  bugs: `${url}/issues`,
});

const compose = ({
  name,
  version,
  description,
  author,
  githubUrl,
  license,
}: Readonly<Parsed>): PackageJson => {
  const composed = {
    name,
    version,
    description,
    author: composeAuthor(author),
    ...(typeof githubUrl === 'undefined' ? {} : composeGithubUrl(githubUrl)),
    license,
  };

  return (omitBy(composed, isEmpty) as unknown) as PackageJson;
};

export default compose;
