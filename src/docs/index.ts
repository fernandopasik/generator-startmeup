import type { Answers } from 'inquirer';
import { ask } from '../core';
import Generator from '../generator';
import type { Parsed } from '../packagejson/parse';
import parse from '../packagejson/parse';
import questions from './questions';

export default class extends Generator {
  private parameters?: Parsed;

  private answers?: Answers;

  public initializing(): void {
    this.parameters = parse(this.packageJson.getAll());
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
      eslint: this.hasDevDependency('eslint'),
      codecov: this.hasDevDependency('codecov'),
      commitlint: this.hasDevDependency('@commitlint/cli'),
      circleci: this.existsDestination('.circleci/config.yml'),
      prettier: this.hasDevDependency('prettier'),
      year: new Date().getFullYear(),
    };

    ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md'].forEach((template: string): void => {
      this.renderTemplate(template, template, options);
    });
  }
}
