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

  const [line1, line2, line3] = lines;

  return {
    hash: line1.replace('commit ', ''),
    author: line2.replace('Author:', '').replace(/<.*>/, '').trim(),
    date: line3.replace('Date:', '').trim(),
  };
};

export default firstCommit;
