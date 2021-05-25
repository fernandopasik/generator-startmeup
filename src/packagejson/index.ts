import type { Answers } from 'inquirer';
import sortPackageJson from 'sort-package-json';
import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import { ask } from '../core';
import compose from './compose';
import type { Parsed } from './parse';
import parse from './parse';
import questions from './questions';

export default class PackageJsonGenerator extends Generator {
  private pkg?: PackageJson;

  private parameters?: Parsed;

  private answers?: Answers;

  public initializing(): void {
    this.pkg = this.packageJson.getAll();

    if (typeof this.pkg !== 'undefined') {
      this.parameters = parse(this.pkg);
    }
  }

  public async prompting(): Promise<void> {
    this.answers = await ask(questions, this.parameters as Answers);
  }

  public configuring(): void {
    const pkg = {
      ...this.pkg,
      ...compose(this.answers as Parsed),
    };

    const sortedPkg = sortPackageJson(pkg);

    this.packageJson.merge(sortedPkg);
  }
}
