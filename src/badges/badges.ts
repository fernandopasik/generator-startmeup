import type { PackageJson } from 'type-fest';
import Generator from '../generator.ts';
import gitMainBranch from '../utils/git-main-branch.ts';

export default class BadgesGenerator extends Generator {
  // eslint-disable-next-line max-lines-per-function
  public async writing(): Promise<void> {
    if (!this.existsDestination('README.md')) {
      return;
    }

    const readme = this.readDestination('README.md', { defaults: '' }) as string;

    const { owner: githubOrg, repo: githubRepo } = (await this.getGitHub()) ?? {};
    const isPrivate = (this.packageJson.get('private') as PackageJson['private']) ?? false;
    const npmPackage = await this.getNpmName();
    const version = this.packageJson.get('version') as PackageJson['version'];
    const mainBranch = gitMainBranch();

    const group1: string[] = [];

    if (npmPackage !== null && !isPrivate && typeof version !== 'undefined') {
      group1.push(
        `[![Gzip Bundle Size](https://img.badgesize.io/https://unpkg.com/${npmPackage}/${npmPackage}.min.js?compression=gzip)](https://unpkg.com/${npmPackage}/${npmPackage}.min.js 'Gzip Bundle Size')`,
      );
    }

    if (typeof githubOrg !== 'undefined' && typeof githubRepo !== 'undefined') {
      if (this.hasFiles('.circleci')) {
        group1.push(
          `[![Build Status](https://circleci.com/gh/${githubOrg}/${githubRepo}.svg?style=svg)](https://circleci.com/gh/${githubOrg}/${githubRepo} 'Build Status')`,
        );
      }

      if (this.hasFiles('.github/workflows/main.yml')) {
        group1.push(
          `[![Build Status](https://github.com/${githubOrg}/${githubRepo}/actions/workflows/main.yml/badge.svg)](https://github.com/${githubOrg}/${githubRepo}/actions/workflows/main.yml 'Build Status')`,
        );
      }

      if (this.fileIncludes('.github/workflows/main.yml', 'codecov')) {
        group1.push(
          `[![Coverage Status](https://codecov.io/gh/${githubOrg}/${githubRepo}/branch/${mainBranch}/graph/badge.svg)](https://codecov.io/gh/${githubOrg}/${githubRepo} 'Coverage Status')`,
        );
      }

      group1.push(
        `[![Known Vulnerabilities](https://snyk.io/test/github/${githubOrg}/${githubRepo}/badge.svg?targetFile=package.json)](https://snyk.io/test/github/${githubOrg}/${githubRepo}?targetFile=package.json 'Known Vulnerabilities')`,
      );
    }

    const group2: string[] = [];

    const contributors = this.packageJson.get('contributors') as PackageJson['contributors'];

    if (typeof contributors !== 'undefined' && contributors.length > 0) {
      group2.push(
        `[![All Contributors](https://img.shields.io/badge/all_contributors-${contributors.length}-orange.svg?style=flat-square)](#contributors)`,
      );
    }

    if (npmPackage !== null && !isPrivate) {
      group2.push(
        `[![npm version](https://img.shields.io/npm/v/${npmPackage}.svg?logo=npm)](https://www.npmjs.com/package/${npmPackage} 'npm version')`,
      );

      group2.push(
        `[![npm downloads](https://img.shields.io/npm/dm/${npmPackage}.svg)](https://www.npmjs.com/package/${npmPackage} 'npm downloads')`,
      );
    }

    const gemName = this.packageJson.get('name') as PackageJson['name'];

    if (this.hasFiles('*.gemspec')) {
      group2.push(
        `[![ruby gem version](https://img.shields.io/gem/v/${gemName}?logo=rubygems)](https://rubygems.org/gems/${gemName} 'ruby gem version')`,
      );
    }

    const badgesZone = /<!-- BADGES - START -->[\S\s]*?<!-- BADGES - END -->/u;
    const group1str = group1.map((badge) => `${badge}\n`).join('');
    const group2str = group2.map((badge) => `${badge}\n`).join('');

    const withBadges = readme.replace(
      badgesZone,
      `<!-- BADGES - START -->\n${group1str}\n${group2str}\n<!-- BADGES - END -->`,
    );

    this.writeDestination('README.md', withBadges);

    await this.formatFile('README.md');
  }
}
