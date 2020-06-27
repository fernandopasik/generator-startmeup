import { Answers } from 'inquirer';
import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import { ask, configs, dependencies } from '../core';
import parse, { Parsed } from '../packagejson/parse';
import questions from './questions';

module.exports = class extends Generator {
  private parameters?: Parsed;

  private answers?: Answers;

  public async initializing(): Promise<void> {
    await dependencies.importAll();

    const pkg = (await configs.load('package.json')) ?? {};
    this.parameters = parse(pkg as PackageJson);
  }

  public async prompting(): Promise<void> {
    this.answers = await ask(questions, this.parameters as Answers);
  }

  public writing(): void {
    const options = {
      githubUrl: '',
      ...this.answers,
      author: {
        name: this.answers?.['author.name'] as string,
      },
      eslint: dependencies.has('eslint', 'dev'),
      codecov: dependencies.has('codecov', 'dev'),
      commitlint: dependencies.has('@commitlint/cli', 'dev'),
      circleci: !!this.fs.exists(this.destinationPath('.circleci/config.yml')),
      year: new Date().getFullYear(),
    };

    ['LICENSE', 'README.md'].forEach((template: string): void => {
      if (!this.fs.exists(this.destinationPath(template))) {
        this.fs.copyTpl(this.templatePath(template), this.destinationPath(template), options);
      }
    });

    ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md'].forEach((template: string): void => {
      this.fs.copyTpl(this.templatePath(template), this.destinationPath(template), options);
    });

    [
      'github/PULL_REQUEST_TEMPLATE.md',
      'github/ISSUE_TEMPLATE/bug_report.md',
      'github/ISSUE_TEMPLATE/feature_request.md',
    ].forEach((template: string): void => {
      this.fs.copyTpl(this.templatePath(template), this.destinationPath(`.${template}`), options);
    });
  }
};
