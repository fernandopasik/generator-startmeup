import type { PackageJson } from 'type-fest';
import Generator from 'yeoman-generator';
import { format } from '../core/configs';

interface Answers {
  confirm: boolean;
}

export default class LintStagedGenerator extends Generator {
  public answers: Answers = { confirm: true };

  public async prompting(): Promise<void> {
    this.answers = await this.prompt<Answers>([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to use lint-staged for pre-commit hook?',
        default: true,
      },
    ]);
  }

  public async configuring(): Promise<void> {
    if (!this.answers.confirm) {
      return;
    }

    // @ts-expect-error not yet in types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.addDevDependencies({ 'lint-staged': '^11.0.0' });

    // @ts-expect-error not yet in types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const devDependencies = this.packageJson.get('devDependencies') as PackageJson;
    // @ts-expect-error not yet in types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const dependencies = this.packageJson.get('dependencies') as PackageJson;

    const config: Record<string, string[] | string> = {};
    const jsExtensions = ['js'];

    if ('react' in dependencies || 'react' in devDependencies) {
      jsExtensions.push('jsx');
    }

    if ('typescript' in devDependencies) {
      jsExtensions.push('ts');

      if ('react' in dependencies || 'react' in devDependencies) {
        jsExtensions.push('tsx');
      }
    }

    const jsCommands = [];

    if ('eslint' in devDependencies) {
      jsCommands.push('eslint');
    }

    if ('jest' in devDependencies) {
      jsCommands.push('jest --bail --findRelatedTests');
    }

    if (jsCommands.length > 0) {
      const matcher = `*.{${jsExtensions.join(',')}}`;
      config[matcher] = jsCommands;
    }

    const formattedConfig = await format(config);

    this.writeDestination('.lintstagedrc.json', formattedConfig);
  }
}
