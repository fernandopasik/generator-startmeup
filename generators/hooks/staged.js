const dependencies = require('../app/dependencies');

module.exports = function staged() {
  this.log('Install staged files utils');

  const commands = [];
  const extensions = [];

  if (dependencies.has('eslint')) {
    commands.push('eslint');
  }

  if (dependencies.has('jest')) {
    commands.push('jest --bail --findRelatedTests');
  }

  if (dependencies.has('typescript')) {
    extensions.push('ts');

    if (dependencies.has('react')) {
      extensions.push('tsx');
    }
  } else {
    extensions.push('js');

    if (dependencies.has('react')) {
      extensions.push('jsx');
    }
  }

  if (commands.length > 0) {
    this.fs.writeJSON(this.destinationPath('.lintstagedrc.json'), {
      [`*.{${extensions.join(',')}}`]: commands,
    });

    dependencies.addDev(['lint-staged']);
  }
};
