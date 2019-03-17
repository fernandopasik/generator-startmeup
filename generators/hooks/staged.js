module.exports = function staged() {
  this.log('Install staged files utils');

  const commands = [];
  const extensions = [];

  if (this.willInstall('eslint')) {
    commands.push('eslint');
  }

  if (this.willInstall('jest')) {
    commands.push('jest --bail --findRelatedTests');
  }

  if (this.willInstall('typescript')) {
    extensions.push('ts');

    if (this.willInstall('react')) {
      extensions.push('tsx');
    }
  } else {
    extensions.push('js');

    if (this.willInstall('react')) {
      extensions.push('jsx');
    }
  }

  if (commands.length > 0) {
    this.fs.writeJSON(this.destinationPath('.lintstagedrc.json'), {
      [`*.{${extensions.join(',')}}`]: commands,
    });

    this.devDependencies.push('lint-staged');
  }
};
