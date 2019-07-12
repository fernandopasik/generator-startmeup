module.exports = function setupSrc(hasTypescript, hasReact) {
  let extension = 'js';

  if (hasTypescript) {
    extension = 'ts';
  }

  if (hasReact) {
    extension += 'x';
  }

  this.fs.write(this.destinationPath(`src/index.${extension}`), '');
};
