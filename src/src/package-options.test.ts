import assert from 'node:assert';
import { describe, it } from 'node:test';
import packageOptions from './package-options.ts';

describe('packageOptions', () => {
  it('by default type is module', () => {
    const name = 'myapp';
    const { type, main, module } = packageOptions(name);

    assert.equal(type, 'module');
    assert.deepStrictEqual(main, module);
  });

  describe('when library', () => {
    it('main file is with app name', () => {
      const name = 'myapp';
      const { main } = packageOptions(name);

      assert.equal(main, `${name}.js`);
    });

    it('files include lib and app name main', () => {
      const name = 'myapp';
      const { files } = packageOptions(name);

      assert.deepStrictEqual(files, ['/lib', `/${name}.*`]);
    });

    it('can have typings', () => {
      const name = 'myapp';
      const { typings } = packageOptions(name, true, true, true);

      assert.equal(typings, `${name}.d.ts`);
    });
  });

  describe('when not library', () => {
    it('main file is app in dist', () => {
      const name = 'myapp';
      const { main } = packageOptions(name, false);

      assert.equal(main, 'dist/app.js');
    });

    it('files include dist', () => {
      const name = 'myapp';
      const { files } = packageOptions(name, false);

      assert.deepStrictEqual(files, ['/dist']);
    });

    it('can have typings', () => {
      const name = 'myapp';
      const { typings } = packageOptions(name, false, true, true);

      assert.equal(typings, 'dist/app.d.ts');
    });
  });

  describe('when is yeoman generator', () => {
    it('main file', () => {
      const name = 'myapp';
      const { main } = packageOptions(name, false, false, false, true);

      assert.equal(main, 'generators/app/index.js');
    });

    it('files include dist', () => {
      const name = 'myapp';
      const { files } = packageOptions(name, false, false, false, true);

      assert.deepStrictEqual(files, ['/generators']);
    });

    it('can have typings', () => {
      const name = 'myapp';
      const { typings } = packageOptions(name, false, false, true, true);

      assert.equal(typings, 'generators/app/index.d.ts');
    });
  });
});
