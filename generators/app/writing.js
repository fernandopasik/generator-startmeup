'use strict';

/**
 * Copy project initial files.
 */
module.exports = function () {

  let bower;

  this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);

  if (this.pkg.devDependencies.bower) {

    this.template('_bower.json', 'bower.json');

    bower = Object.assign(
      this.fs.readJSON(this.templatePath('_bower.json'), {}),
      {
        name: this.pkg.name,
        description: this.pkg.description,
        homepage: this.pkg.homepage,
        authors: this.pkg.author,
        repository: { type: 'git', url: this.pkg.repository.url }
      }
    );

    this.fs.writeJSON(this.destinationPath('bower.json'), bower);
  }
  this.template('README.md');
  this.copy('LICENSE');
};
