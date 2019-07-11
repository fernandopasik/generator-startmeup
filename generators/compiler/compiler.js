const COMPILER_DEPENDENCIES = new Map([
  ['none', []],
  ['babel', ['@babel/cli', '@babel/core', '@babel/preset-env']],
  ['typescript', ['typescript', '@babel/preset-typescript']],
]);

const DEPENDENCIES_COMPILER = new Map();
COMPILER_DEPENDENCIES.forEach((dependencies, compiler) => {
  dependencies.forEach((dependency) => {
    DEPENDENCIES_COMPILER.set(dependency, compiler);
  });
});

module.exports.detect = (pkg = {}) => {
  const { devDependencies } = pkg;
  let compiler;

  if (devDependencies) {
    DEPENDENCIES_COMPILER.forEach((dependency) => {
      if (devDependencies[dependency]) {
        compiler = DEPENDENCIES_COMPILER.get(dependency);
      }
    });
  }

  return compiler;
};

module.exports.getDependencies = (compiler) => {
  const dependencies = [];

  if (compiler !== 'none') {
    dependencies.push(...COMPILER_DEPENDENCIES.get('babel'));
  }

  if (compiler === 'typescript') {
    dependencies.push(...COMPILER_DEPENDENCIES.get('typescript'));
  }

  return dependencies;
};
