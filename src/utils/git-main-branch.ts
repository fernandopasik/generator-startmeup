import shelljs from 'shelljs';

const gitMainBranch = (): string =>
  // eslint-disable-next-line import/no-named-as-default-member
  shelljs
    .exec('git symbolic-ref refs/remotes/origin/HEAD | sed "s@^refs/remotes/origin/@@"', {
      silent: true,
    })
    .stdout.trim();

export default gitMainBranch;
