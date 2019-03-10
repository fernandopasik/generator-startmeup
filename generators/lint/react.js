module.exports = function typescript() {
  const { dependencies = {}, devDependencies = {} } = this.pkgJson;

  if (dependencies.react || devDependencies.react) {
    this.devDependencies.push(
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
    );

    this.eslintConfig.extends.push('airbnb');
    this.eslintConfig.env = {
      ...this.eslintConfig.env,
      browser: true,
    };
  } else {
    this.devDependencies.push(
      'eslint-config-airbnb-base',
      'eslint-plugin-import',
    );

    this.eslintConfig.extends.push('airbnb-base');
  }
};
