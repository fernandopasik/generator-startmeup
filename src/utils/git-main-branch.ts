import shell from 'shelljs';

const gitMainBranch = (): string =>
  shell
    .exec('git symbolic-ref refs/remotes/origin/HEAD | sed "s@^refs/remotes/origin/@@"', {
      silent: true,
    })
    .stdout.trim();

export default gitMainBranch;
