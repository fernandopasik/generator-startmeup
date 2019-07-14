import Generator from 'yeoman-generator';
import sort from 'sort-package-json';

import info from '../app/info';
import parse, { Parsed } from './parse';
import compose from './compose';

import { PackageJson } from './package-json';

export default class PackageJsonGenrator extends Generator {
  private pkg?: PackageJson

  private parameters?: Parsed

  public initializing(): void {
    this.pkg = this.fs.readJSON('package.json') || {};
    if (this.pkg) {
      this.parameters = parse(this.pkg);
    }
  }

  public async prompting(): Promise<void> {
    const questions = [
      'name',
      'description',
      'authorName',
      'authorEmail',
      'authorUrl',
      'github',
      'githubUsername',
      'githubUrl',
      'license',
    ];

    await info.ask(questions, this.parameters);
  }

  public writing(): void {
    const pkg = {
      ...this.pkg,
      ...compose(info.answers as Parsed),
    };

    const sortedPkg = sort(pkg);

    this.fs.writeJSON('package.json', sortedPkg);
  }
}
