import load from '../load';
import store from '../store';

describe('load file', () => {
  beforeEach(() => {
    store.clear();
  });

  it('returns the imported file', async () => {
    const file = await load('jest.config.cjs');

    expect(file).toMatchInlineSnapshot(`
      Object {
        "collectCoverageFrom": Array [
          "src/**/*.ts",
        ],
        "testEnvironment": "node",
        "transform": Object {
          "^.+\\\\.[j|t]s$": "ts-jest",
        },
      }
    `);
  });

  it('sets in cache the imported file', async () => {
    const spy = jest.spyOn(store, 'set');
    const file = await load('jest.config.cjs');

    expect(spy).toHaveBeenLastCalledWith('jest.config.cjs', file);

    spy.mockRestore();
  });

  it('returns the cached version after first time', async () => {
    const spy = jest.spyOn(store, 'get');
    await load('jest.config.cjs');
    await load('jest.config.cjs');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith('jest.config.cjs');

    spy.mockRestore();
  });

  it('returns undefined if file does not exist', async () => {
    const file = await load('non-existent.js');

    expect(file).toBeUndefined();
  });
});
