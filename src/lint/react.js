const dependencies = require('../app/dependencies');

module.exports = function typescript() {
  if (dependencies.has('react')) {
    dependencies.addDev([
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
    ]);

    this.eslintConfig.extends.push('airbnb');
    this.eslintConfig.env = {
      ...this.eslintConfig.env,
      browser: true,
    };
  } else {
    dependencies.addDev(['eslint-config-airbnb-base', 'eslint-plugin-import']);

    this.eslintConfig.extends.push('airbnb-base');
  }
};
