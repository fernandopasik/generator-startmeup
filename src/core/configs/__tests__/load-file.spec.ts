import loadFile from '../load-file';
import store from '../store';

describe('load file', () => {
  it('dynamic imports a file', async () => {
    const file = await loadFile('./jest.config.js');

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
    const file = await loadFile('./jest.config.js');

    expect(spy).toHaveBeenLastCalledWith('./jest.config.js', file);

    spy.mockRestore();
  });
});
