import { Answers } from 'inquirer';
import sort from 'sort-package-json';
import Generator from 'yeoman-generator';
import { ask, configs } from '../core';
import compose from './compose';
import { PackageJson } from './package-json';
import parse, { Parsed } from './parse';
import questions from './questions';

export default class PackageJsonGenerator extends Generator {
  private pkg?: PackageJson;

  private parameters?: Parsed;

  private answers?: Answers;

  public async initializing(): Promise<void> {
    this.pkg = await configs.load<PackageJson>('package.json');

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

    const sortedPkg = sort(pkg);

    configs.set('package.json', sortedPkg);
  }
}
