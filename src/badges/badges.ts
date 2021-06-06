import type { PackageJson } from 'type-fest';
import Generator from '../generator';

export default class BadgesGenerator extends Generator {
  public async writing(): Promise<void> {
    if (!this.existsDestination('README.md')) {
      return;
    }

    const readme = this.readDestination('README.md');

    const { owner: githubOrg, repo: githubRepo } = (await this.getGitHub()) ?? {};
    const npmPackage = await this.getNpmName();

    const group1: string[] = [];

    if (npmPackage !== null && this.hasDevDependency('bundlewatch')) {
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

      if (this.hasDevDependency('codecov')) {
        group1.push(
          `[![Coverage Status](https://codecov.io/gh/${githubOrg}/${githubRepo}/branch/master/graph/badge.svg)](https://codecov.io/gh/${githubOrg}/${githubRepo} 'Coverage Status')`,
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

    if (npmPackage !== null) {
      group2.push(
        `[![npm version](https://img.shields.io/npm/v/${npmPackage}.svg?logo=npm)](https://www.npmjs.com/package/${npmPackage} 'npm version')`,
      );

      group2.push(
        `[![npm downloads](https://img.shields.io/npm/dm/${npmPackage}.svg)](https://www.npmjs.com/package/${npmPackage} 'npm downloads')`,
      );
    }

    const BADGES_START = '<!-- BADGES - START -->';
    const BADGES_END = '<!-- BADGES - END -->';
    const badgesZone = new RegExp(`${BADGES_START}[\\S\\s]*${BADGES_END}`);
    const group1str = group1.map((badge) => `${badge}\n`).join('');
    const group2str = group2.map((badge) => `${badge}\n`).join('');

    const withBadges = readme.replace(
      badgesZone,
      `${BADGES_START}\n${group1str}\n${group2str}\n${BADGES_END}`,
    );

    this.writeDestination('README.md', withBadges);

    await this.formatFile('README.md');
  }
}
