'use strict';

const path = require('path');

module.exports.dirs = {
  generator: path.join(__dirname, '../generators/app'),
  tmp: path.join(__dirname, '../.tmp')
};
