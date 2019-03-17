const setupTypescript = require('../setup-typescript');

describe('Setup typescript config', () => {
  test('file path', () => {
    const mock = {
      fs: { writeJSON: jest.fn() },
      destinationPath: jest.fn(),
    };

    setupTypescript.call(mock);

    expect(mock.destinationPath).toHaveBeenCalledWith('tsconfig.json');
  });

  test('json content', () => {
    const mock = {
      fs: { writeJSON: jest.fn() },
      destinationPath: jest.fn(path => `/${path}`),
    };

    setupTypescript.call(mock);

    expect(mock.fs.writeJSON).toHaveBeenCalledWith('/tsconfig.json', expect.any(Object));
  });
});
