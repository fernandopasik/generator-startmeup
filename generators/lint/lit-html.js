const dependencies = require('../app/dependencies');

module.exports = function litHtml() {
  if (dependencies.has('lit-html')) {
    dependencies.addDev(['eslint-plugin-lit']);

    this.eslintConfig.env = {
      ...this.eslintConfig.env,
      browser: true,
    };

    this.eslintConfig.plugins.push('lit');
    this.eslintConfig.rules = {
      ...this.eslintConfig.rules,
      'lit/attribute-value-entities': 'error',
      'lit/binding-positions': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/no-invalid-html': 'error',
      'lit/no-legacy-template-syntax': 'error',
      'lit/no-property-change-update': 'error',
      'lit/no-template-bind': 'error',
      'lit/no-template-map': 'error',
      'lit/no-useless-template-literals': 'error',
      'lit/no-value-attribute': 'error',
    };
  }
};
