import Generator from '../generator';

export default class LintGenerator extends Generator {
  public async configuring(): Promise<void> {
    const extensions = this.getExtensions();
    const onlyJs = extensions.length === 1 && extensions[0] === 'js';

    this.packageJson.merge({
      scripts: {
        lint: `eslint .${onlyJs ? '' : ` --ext ${extensions.join(',')}`}`,
      },
    });

    await this.addDevDependencies(['eslint']);
  }

  public async writing(): Promise<void> {
    const options = {
      babel: this.hasDevDependency('@babel/core'),
      browser:
        this.hasAnyDependency('react') ||
        this.hasAnyDependency('lit') ||
        this.hasAnyDependency('lit-html'),
      jest: this.hasDevDependency('jest'),
      lit: this.hasAnyDependency('lit') || this.hasAnyDependency('lit-html'),
      prettier: this.hasAnyDependency('prettier'),
      puppeteer: this.hasDevDependency('puppeteer'),
      react: this.hasAnyDependency('react'),
      storybook:
        this.hasDevDependency('@storybook/react') ||
        this.hasDevDependency('@storybook/web-components'),
      typescript: this.hasDevDependency('typescript'),
    };

    if (!options.browser) {
      await this.addDevDependencies(['eslint-plugin-security']);
    }

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

    await this.renderTpl('eslintrc.json', '.eslintrc.json', options, { rmWhitespace: true });
  }
}
