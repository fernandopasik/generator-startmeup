const dependencies = require('../app/dependencies');

module.exports = function typescript() {
  if (dependencies.has('typescript')) {
    dependencies.addDev([
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
    ]);

    this.eslintConfig.extends.push('plugin:@typescript-eslint/recommended');
    this.eslintConfig.parser = '@typescript-eslint/parser';
    this.eslintConfig.plugins.push('@typescript-eslint');
    this.eslintConfig.settings['import/resolver'] = {
      node: {
        extensions: ['.ts', '.js'],
      },
    };
    this.eslintConfig.rules['@typescript-eslint/indent'] = ['error', 2];
  }
};
