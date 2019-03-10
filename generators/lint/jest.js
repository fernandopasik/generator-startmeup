module.exports = function jest() {
  const { dependencies = {}, devDependencies = {} } = this.pkgJson;

  if (devDependencies.jest) {
    this.devDeps.push('eslint-plugin-jest');

    this.eslintConfig.plugins.push('jest');

    const extensions = [`${devDependencies.typescript ? 't' : 'j'}s`];
    if (dependencies.react || devDependencies.react) {
      extensions.push(`${extensions[0]}x`);
    }

    const files = [
      `**/__mocks__/*.${extensions[0]}`,
      ...extensions.map(extension => `**/__tests__/*.${extension}`),
      ...extensions.map(extension => `**/*.spec.${extension}`),
    ];

    const override = {
      files,
      env: {
        jest: true,
      },
    };
    this.eslintConfig.overrides.push(override);

    this.eslintConfig.rules = {
      ...this.eslintConfig.rules,
      'jest/consistent-test-it': ['error', { fn: 'test' }],
      'jest/expect-expect': 'error',
      'jest/lowercase-name': ['error', { ignore: ['describe'] }],
      'jest/no-alias-methods': 'error',
      'jest/no-disabled-tests': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-hooks': 'off',
      'jest/no-identical-title': 'error',
      'jest/no-jasmine-globals': 'error',
      'jest/no-jest-import': 'error',
      'jest/no-large-snapshots': 'error',
      'jest/no-test-callback': 'error',
      'jest/no-test-prefixes': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/no-truthy-falsy': 'error',
      'jest/prefer-called-with': 'error',
      'jest/prefer-expect-assertions': 'off',
      'jest/prefer-inline-snapshots': 'error',
      'jest/prefer-spy-on': 'error',
      'jest/prefer-strict-equal': 'error',
      'jest/prefer-to-be-null': 'error',
      'jest/prefer-to-be-undefined': 'error',
      'jest/prefer-to-contain': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/prefer-todo': 'error',
      'jest/require-tothrow-message': 'error',
      'jest/valid-describe': 'error',
      'jest/valid-expect-in-promise': 'error',
      'jest/valid-expect': 'error',
    };
  }
};
