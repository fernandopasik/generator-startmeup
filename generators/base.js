const Generator = require('yeoman-generator');

module.exports = class Base extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.pkgJson = Object.assign({}, this.fs.readJSON(this.destinationPath('package.json')));
    this.devDeps = [];
  }

  willInstall(dependency) {
    const { devDependencies = {} } = this.pkgJson;
    return devDependencies[dependency] || this.devDeps.includes(dependency);
  }
};
