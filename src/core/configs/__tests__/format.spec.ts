import prettier from 'prettier';
import { mocked } from 'ts-jest/utils';
import format from '../format';
import loadPrettierConfig from '../load-prettier-config';

jest.mock('../load-prettier-config');

describe('format', () => {
  it('calls prettier', async () => {
    const myConfig = { test: true };
    const spy = jest.spyOn(prettier, 'format');

    await format(myConfig);

    expect(spy).toHaveBeenCalledWith(JSON.stringify(myConfig, null, 2), expect.anything());

    spy.mockRestore();
  });

  it('loads prettier config', async () => {
    mocked(loadPrettierConfig).mockClear();

    await format({});

    expect(loadPrettierConfig).toHaveBeenCalledTimes(1);
  });

  it('can do js', async () => {
    const myConfig = { test: true };
    const content = `module.exports = ${JSON.stringify(myConfig, null, 2)}`;
    const spy = jest.spyOn(prettier, 'format');

    await format(myConfig, 'js');

    expect(spy).toHaveBeenCalledWith(content, expect.objectContaining({ parser: 'babel' }));

    spy.mockRestore();
  });

  it('can do json', async () => {
    const myConfig = { test: true };
    const spy = jest.spyOn(prettier, 'format');

    await format(myConfig, 'json');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify(myConfig, null, 2),
      expect.objectContaining({ parser: 'json' }),
    );

    spy.mockRestore();
  });
});
