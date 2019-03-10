module.exports = function litHtml() {
  const { dependencies = {}, devDependencies = {} } = this.pkgJson;

  if (dependencies['lit-html'] || devDependencies['lit-html']) {
    this.devDependencies.push('eslint-plugin-lit');

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
