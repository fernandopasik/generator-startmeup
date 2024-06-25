import shelljs from 'shelljs';

const gitMainBranch = (): string =>
  shelljs
    .exec('git symbolic-ref refs/remotes/origin/HEAD | sed "s@^refs/remotes/origin/@@"', {
      silent: true,
    })
    .stdout.trim();

export default gitMainBranch;
