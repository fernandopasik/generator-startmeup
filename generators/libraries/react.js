module.exports = function configReact(compiler) {
  this.dependencies.push('react', 'react-dom');
  this.devDependencies.push('react-test-renderer');

  if (compiler === 'babel') {
    this.devDependencies.push('@babel/preset-react');
    this.babelConfig.presets.push('@babel/preset-react');
  }

  if (compiler === 'typescript') {
    this.devDependencies.push('@types/react', '@types/react-dom');
  }
};
