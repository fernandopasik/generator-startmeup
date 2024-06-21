import shelljs from 'shelljs';

interface Commit {
  hash: string;
  author: string;
  date: string;
}

export const logFirstCommit = (): string =>
  // eslint-disable-next-line import/no-named-as-default-member
  shelljs.exec('git log --reverse | sed -n -e "1,3p"', { silent: true }).stdout.trim();

const firstCommit = (): Commit | null => {
  const COMMIT_PARAMS = 3;
  const lines = logFirstCommit().split('\n');

  if (lines.filter(Boolean).length < COMMIT_PARAMS) {
    return null;
  }

  const [line1, line2, line3] = lines as [string, string, string];

  return {
    author: line2.replace('Author:', '').replace(/<.*>/u, '').trim(),
    date: line3.replace('Date:', '').trim(),
    hash: line1.replace('commit ', ''),
  };
};

export default firstCommit;
