const configReact = require('../react');
const dependencies = require('../../app/dependencies');

jest.mock('../../app/dependencies');

describe('Setup React', () => {
  test('add react dependencies', () => {
    configReact();

    expect(dependencies.add).toHaveBeenCalledWith(['react', 'react-dom']);
    expect(dependencies.addDev).toHaveBeenCalledWith(['react-test-renderer']);
  });

  test('with babel adds preset', () => {
    const baseMock = {
      babelConfig: { presets: [] },
    };

    configReact.call(baseMock, 'babel');

    expect(dependencies.addDev).toHaveBeenCalledWith(['@babel/preset-react']);
  });

  test('with babel sets the preset in babel config', () => {
    const baseMock = {
      babelConfig: { presets: [] },
    };

    configReact.call(baseMock, 'babel');

    expect(baseMock.babelConfig.presets).toStrictEqual(['@babel/preset-react']);
  });

  test('with typescript adds types', () => {
    configReact.call({}, 'typescript');

    expect(dependencies.addDev).toHaveBeenCalledWith(['@types/react', '@types/react-dom']);
  });
});
