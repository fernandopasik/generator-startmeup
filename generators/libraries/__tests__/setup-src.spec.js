const setupSrc = require('../setup-src');

describe('Setup src files', () => {
  test('write in src folder', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(),
    };

    setupSrc.call(mock);

    expect(mock.destinationPath).toHaveBeenCalledWith(expect.stringMatching(/^src/));
  });

  test('call write', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(path => path),
    };

    setupSrc.call(mock);

    expect(mock.fs.write).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  test('write empty file', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(path => path),
    };

    setupSrc.call(mock);

    expect(mock.fs.write).toHaveBeenCalledWith(expect.any(String), '');
  });

  test('by default will be js file', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(path => path),
    };

    setupSrc.call(mock);

    expect(mock.fs.write).toHaveBeenCalledWith('src/index.js', expect.any(String));
  });

  test('it can be a react js file', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(path => path),
    };

    setupSrc.call(mock, false, true);

    expect(mock.fs.write).toHaveBeenCalledWith('src/index.jsx', expect.any(String));
  });

  test('it can be a typescript file', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(path => path),
    };

    setupSrc.call(mock, true);

    expect(mock.fs.write).toHaveBeenCalledWith('src/index.ts', expect.any(String));
  });

  test('it can be a react typescript file', () => {
    const mock = {
      fs: { write: jest.fn() },
      destinationPath: jest.fn(path => path),
    };

    setupSrc.call(mock, true, true);

    expect(mock.fs.write).toHaveBeenCalledWith('src/index.tsx', expect.any(String));
  });
});
