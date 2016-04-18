'use strict';

const
  path = require('path'),
  yeomanTest = require('yeoman-test');

module.exports = () =>
  yeomanTest
    .run(path.join(__dirname, '../generators/app'))
    .inDir(path.join(__dirname, '../.tmp'))
    .withOptions({ skipInstall: true });
