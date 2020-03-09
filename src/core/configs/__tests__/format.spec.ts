import prettier from 'prettier';
import { mocked } from 'ts-jest/utils';
import format from '../format';
import loadPrettierConfig from '../load-prettier-config';

jest.mock('../load-prettier-config');

describe('format', () => {
  it('calls prettier', async () => {
    const myConfig = { test: true };
    const spy = jest.spyOn(prettier, 'format');

    await format(JSON.stringify(myConfig));

    expect(spy).toHaveBeenCalledWith(JSON.stringify(myConfig), expect.anything());

    spy.mockRestore();
  });

  it('loads prettier config', async () => {
    mocked(loadPrettierConfig).mockClear();

    await format(JSON.stringify({}));

    expect(loadPrettierConfig).toHaveBeenCalledTimes(1);
  });

  it('can do js', async () => {
    const myConfig = { test: true };
    const content = `module.exports = ${JSON.stringify(myConfig)}`;
    const spy = jest.spyOn(prettier, 'format');

    await format(content, 'js');

    expect(spy).toHaveBeenCalledWith(content, expect.objectContaining({ parser: 'babel' }));

    spy.mockRestore();
  });

  it('can do json', async () => {
    const myConfig = { test: true };
    const spy = jest.spyOn(prettier, 'format');

    await format(JSON.stringify(myConfig), 'json');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify(myConfig),
      expect.objectContaining({ parser: 'json' }),
    );

    spy.mockRestore();
  });
});
