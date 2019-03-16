const config = require('./tsconfig.json');

module.exports = function setupTypescript() {
  this.fs.writeJSON(this.destinationPath('tsconfig.json'), config);
};
