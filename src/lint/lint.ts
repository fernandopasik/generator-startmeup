import Generator from '../generator';

export default class LintGenerator extends Generator {
  public async configuring(): Promise<void> {
    const extensions = this.getJsExtensions();

    this.packageJson.merge({
      scripts: {
        lint: `eslint . --ext ${extensions.join(',')}`,
      },
    });

    await this.addDevDependencies(['eslint']);
  }

  public async writing(): Promise<void> {
    const options = {
      babel: this.hasDevDependency('@babel/core'),
      jest: this.hasDevDependency('jest'),
      lit: this.hasAnyDependency('lit') || this.hasAnyDependency('lit-html'),
      prettier: this.hasDevDependency('prettier'),
      puppeteer: this.hasDevDependency('puppeteer'),
      react: this.hasAnyDependency('react'),
      storybook: this.hasDevDependency('storybook'),
      typescript: this.hasDevDependency('typescript'),
    };

    if (options.react) {
      await this.addDevDependencies([
        'eslint-config-airbnb',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
      ]);
    } else {
      await this.addDevDependencies(['eslint-config-airbnb-base', 'eslint-plugin-import']);
    }

    if (options.typescript) {
      await this.addDevDependencies([
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
      ]);
    }

    if (options.babel) {
      await this.addDevDependencies(['babel-eslint']);
    }

    if (options.lit) {
      await this.addDevDependencies([
        'eslint-plugin-lit',
        'eslint-plugin-lit-a11y',
        'eslint-plugin-wc',
      ]);
    }

    if (options.jest) {
      await this.addDevDependencies(['eslint-plugin-jest']);
    }

    if (options.prettier) {
      await this.addDevDependencies(['eslint-config-prettier', 'eslint-plugin-prettier']);
    }

    this.renderTemplate('eslintrc.json', '.eslintrc.json', options, { rmWhitespace: true });

    const config = this.readDestination('.eslintrc.json');

    const configJSON = config.replace(/[\s]*\/\//g, '');
    const formattedConfig = await this.formatFile(configJSON);

    this.writeDestination('.eslintrc.json', formattedConfig);
  }
}
