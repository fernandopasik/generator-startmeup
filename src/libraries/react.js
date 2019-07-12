const dependencies = require('../app/dependencies');

module.exports = function configReact(compiler) {
  dependencies.add(['react', 'react-dom']);
  dependencies.addDev(['react-test-renderer']);

  if (compiler === 'babel') {
    dependencies.addDev(['@babel/preset-react']);
    this.babelConfig.presets.push('@babel/preset-react');
  }

  if (compiler === 'typescript') {
    dependencies.addDev(['@types/react', '@types/react-dom']);
  }
};
