import load from '../load';
import store from '../store';

describe('load file', () => {
  beforeEach(() => {
    store.clear();
  });

  it('returns the imported file', async () => {
    const file = await load('.commitlintrc.json');

    expect(file).toMatchInlineSnapshot(`
      Object {
        "extends": Array [
          "@commitlint/config-conventional",
        ],
      }
    `);
  });

  it('sets in cache the imported file', async () => {
    const spy = jest.spyOn(store, 'set');
    const file = await load('.commitlintrc.json');

    expect(spy).toHaveBeenLastCalledWith('.commitlintrc.json', file);

    spy.mockRestore();
  });

  it('returns the cached version after first time', async () => {
    const spy = jest.spyOn(store, 'get');
    await load('.commitlintrc.json');
    await load('.commitlintrc.json');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith('.commitlintrc.json');

    spy.mockRestore();
  });

  it('returns undefined if file does not exist', async () => {
    const file = await load('non-existent.js');

    expect(file).toBeUndefined();
  });
});
