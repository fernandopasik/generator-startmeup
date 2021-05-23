import Generator from '../generator';

export default class BabelGenerator extends Generator {
  public async configuring(): Promise<void> {
    await this.addDevDependencies(['@babel/core']);
  }

  public async writing(): Promise<void> {
    const options = {
      react: this.hasAnyDependency('react'),
      typescript: this.hasDevDependency('typescript'),
    };

    await this.addDevDependencies(['@babel/preset-env', '@babel/plugin-proposal-decorators']);

    if (options.react) {
      await this.addDevDependencies(['@babel/preset-react']);
    }

    if (options.typescript) {
      await this.addDevDependencies(['@babel/preset-typescript']);
    }

    this.renderTemplate('babel.config.js', 'babel.config.js', options, { rmWhitespace: true });

    await this.formatFile('babel.config.js');
  }
}
