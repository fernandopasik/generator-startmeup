module.exports = function typescript() {
  const { devDependencies = {} } = this.pkgJson;

  if (devDependencies.typescript) {
    this.devDependencies.push(
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
    );

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
