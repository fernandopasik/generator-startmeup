const configReact = require('../react');
const dependencies = require('../../app/dependencies');

describe('Setup React', () => {
  test('add react dependencies', () => {
    const spyAdd = jest.spyOn(dependencies, 'add');
    const spyAddDev = jest.spyOn(dependencies, 'addDev');

    configReact();

    expect(spyAdd).toHaveBeenCalledWith(['react', 'react-dom']);
    expect(spyAddDev).toHaveBeenCalledWith(['react-test-renderer']);

    spyAdd.mockRestore();
    spyAddDev.mockRestore();
  });

  test('with babel adds preset', () => {
    const baseMock = {
      babelConfig: { presets: [] },
    };
    const spyAddDev = jest.spyOn(dependencies, 'addDev');

    configReact.call(baseMock, 'babel');

    expect(spyAddDev).toHaveBeenCalledWith(['@babel/preset-react']);

    spyAddDev.mockRestore();
  });

  test('with babel sets the preset in babel config', () => {
    const baseMock = {
      babelConfig: { presets: [] },
    };

    configReact.call(baseMock, 'babel');

    expect(baseMock.babelConfig.presets).toStrictEqual(['@babel/preset-react']);
  });

  test('with typescript adds types', () => {
    const spyAddDev = jest.spyOn(dependencies, 'addDev');

    configReact.call({}, 'typescript');

    expect(spyAddDev).toHaveBeenCalledWith(['@types/react', '@types/react-dom']);

    spyAddDev.mockRestore();
  });
});
