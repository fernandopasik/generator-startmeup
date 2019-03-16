const configReact = require('../react');

describe('Setup React', () => {
  test('add react dependencies', () => {
    const baseMock = {
      dependencies: [],
      devDependencies: [],
    };

    configReact.call(baseMock);

    expect(baseMock.dependencies).toStrictEqual(['react', 'react-dom']);
    expect(baseMock.devDependencies).toStrictEqual(['react-test-renderer']);
  });

  test('with babel adds preset', () => {
    const baseMock = {
      babelConfig: { presets: [] },
      dependencies: [],
      devDependencies: [],
    };

    configReact.call(baseMock, 'babel');

    expect(baseMock.devDependencies).toStrictEqual(['react-test-renderer', '@babel/preset-react']);
  });

  test('with babel sets the preset in babel config', () => {
    const baseMock = {
      babelConfig: { presets: [] },
      dependencies: [],
      devDependencies: [],
    };

    configReact.call(baseMock, 'babel');

    expect(baseMock.babelConfig.presets).toStrictEqual(['@babel/preset-react']);
  });

  test('with typescript adds types', () => {
    const baseMock = {
      dependencies: [],
      devDependencies: [],
    };

    configReact.call(baseMock, 'typescript');

    expect(baseMock.devDependencies).toStrictEqual(['react-test-renderer', '@types/react', '@types/react-dom']);
  });
});
