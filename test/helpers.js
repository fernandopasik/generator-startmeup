'use strict';

const
  path = require('path'),
  yeomanTest = require('yeoman-test');

module.exports.generator = () =>
  yeomanTest
    .run(path.join(__dirname, '../generators/app'))
    .inDir(path.join(__dirname, '../.tmp'))
    .withOptions({ skipInstall: true });

module.exports.copyRootPkg = generator => {
  generator.fs.copy(
    path.join(__dirname, '../package.json'),
    path.join(__dirname, '../.tmp/package.json')
  );
};
