import Generator from 'yeoman-generator';
import { Answers } from 'inquirer';

import ask from '../app/ask';
import { PackageJson } from '../packagejson/package-json';
import parse, { Parsed } from '../packagejson/parse';
import questions from './questions';

module.exports = class extends Generator {
  private pkg?: PackageJson;

  private parameters?: Parsed;

  private answers?: Answers;

  public initializing(): void {
    this.pkg = this.fs.readJSON('package.json', {});
    if (this.pkg) {
      this.parameters = parse(this.pkg);
    }
  }

  public async prompting(): Promise<void> {
    this.answers = await ask(questions, this.parameters as Answers);
  }

  public writing(): void {
    const { devDependencies = {} } = this.pkg || {};
    const options = {
      githubUrl: '',
      ...this.answers,
      author: {
        name: this?.answers?.['author.name'],
      },
      eslint: !!devDependencies.eslint,
      codecov: !!devDependencies.codecov,
      commitlint: !!devDependencies['@commitlint/cli'],
      circleci: !!this.fs.exists(this.destinationPath('.circleci/config.yml')),
      year: new Date().getFullYear(),
    };

    ['LICENSE', 'README.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md'].forEach(
      (template: string): void => {
        this.fs.copyTpl(this.templatePath(template), this.destinationPath(template), options);
      },
    );

    [
      'github/PULL_REQUEST_TEMPLATE.md',
      'github/ISSUE_TEMPLATE/bug_report.md',
      'github/ISSUE_TEMPLATE/feature_request.md',
    ].forEach((template: string): void => {
      this.fs.copyTpl(this.templatePath(template), this.destinationPath(`.${template}`), options);
    });
  }
};
