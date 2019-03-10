const Generator = require('yeoman-generator');
const Base = require('../base');

jest.mock('yeoman-generator');

describe('Base generator', () => {
  test('is a Yeoman Generator', () => {
    const SUT = new Base();

    expect(Generator).toHaveBeenCalledWith(undefined, undefined);
    expect(SUT).toHaveProperty('fs');
  });

  test('reads package.json', () => {
    const pkgJson = { name: 'example' };
    const readJSON = jest.fn(() => pkgJson);
    const destinationPath = jest.fn(() => './package.json');
    Generator.mockImplementationOnce(() => ({
      destinationPath,
      fs: { readJSON },
    }));
    const SUT = new Base();

    expect(destinationPath).toHaveBeenCalledWith('package.json');
    expect(readJSON).toHaveBeenCalledWith('./package.json');
    expect(SUT).toHaveProperty('pkgJson', pkgJson);
  });

  describe('check if will install a dev dependency', () => {
    test('return false if not present in current package.json nor dependency install list', () => {
      const SUT = new Base();

      expect(SUT.willInstall('example')).toBe(false);
    });

    test('could return true if present in current package.json', () => {
      const SUT = new Base();
      SUT.pkgJson.devDependencies = { example: '*' };

      expect(SUT.willInstall('example')).toBe(true);
    });

    test('could return true if present in dependency install list', () => {
      const SUT = new Base();
      SUT.devDependencies = ['example'];

      expect(SUT.willInstall('example')).toBe(true);
    });
  });

  describe('prompt fields', () => {
    test('calls for promp util', async () => {
      const SUT = new Base();

      await SUT.promptFields();

      expect(SUT.prompt).toHaveBeenCalledWith(expect.any(Array));
    });

    test('by default all fields', async () => {
      const SUT = new Base();

      await SUT.promptFields();

      expect(SUT.prompt.mock.calls[0][0]).toHaveLength(8);
    });

    test('a group of fields', async () => {
      const SUT = new Base();

      await SUT.promptFields(['appName', 'appDescription']);

      expect(SUT.prompt.mock.calls[0][0]).toHaveLength(2);
      expect(SUT.prompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: 'appName' }),
          expect.objectContaining({ name: 'appDescription' }),
        ]),
      );
    });

    test('only known fields', async () => {
      const SUT = new Base();

      await SUT.promptFields(['appName', 'unknown']);

      expect(SUT.prompt.mock.calls[0][0]).toHaveLength(1);
      expect(SUT.prompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: 'appName' }),
        ]),
      );
    });
  });
});
