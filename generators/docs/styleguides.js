module.exports = function styleguides() {
  const list = [];
  const { devDependencies = {} } = this.pkgJson;

  if (devDependencies['@commitlint/cli']) {
    list.push('* Git commit messages are checked with [commitlint](https://github.com/marionebl/commitlint) and follow the [conventional commits rules](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-conventional#rules);');
  }

  if (devDependencies.eslint) {
    list.push('* JavaScript styles are checked with [eslint](https://eslint.org/) and follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).');
  }

  return list.length > 0 ? list.join('\n') : '';
};
