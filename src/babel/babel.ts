import Generator from '../generator';

export default class BabelGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['@babel/core']);
  }

  public async writing(): Promise<void> {
    const options = {
      module: this.packageJson.get('type') === 'module',
      react: this.hasAnyDependency('react'),
      typescript: this.hasAnyDependency('typescript'),
    };

    await this.addDevDependencies(['@babel/preset-env', '@babel/plugin-proposal-decorators']);

    if (options.react) {
      await this.addDevDependencies(['@babel/preset-react']);
    }

    if (options.typescript) {
      await this.addDevDependencies(['@babel/preset-typescript']);
    }

    await this.renderTpl('babel.config.js', 'babel.config.js', options, { rmWhitespace: true });
  }
}
