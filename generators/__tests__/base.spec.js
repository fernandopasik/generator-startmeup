const Generator = require('yeoman-generator');
const Base = require('../base');

jest.mock('yeoman-generator');

describe('Base generator', () => {
  test('is a Yeoman Generator', () => {
    const SUT = new Base();

    expect(Generator).toHaveBeenCalledWith(undefined, undefined);
    expect(SUT).toHaveProperty('fs');
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
