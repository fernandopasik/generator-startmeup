import packageOptions from '../package-options.js';

describe('packageOptions', () => {
  it('by default type is module', () => {
    const name = 'myapp';
    const { type, main, module } = packageOptions(name);

    expect(type).toBe('module');
    expect(main).toStrictEqual(module);
  });

  describe('when library', () => {
    it('main file is with app name', () => {
      const name = 'myapp';
      const { main } = packageOptions(name);

      expect(main).toBe(`${name}.js`);
    });

    it('files include lib and app name main', () => {
      const name = 'myapp';
      const { files } = packageOptions(name);

      expect(files).toStrictEqual(['/lib', `/${name}.*`]);
    });

    it('can have typings', () => {
      const name = 'myapp';
      const { typings } = packageOptions(name, true, true);

      expect(typings).toBe(`${name}.d.ts`);
    });
  });

  describe('when not library', () => {
    it('main file is app in dist', () => {
      const name = 'myapp';
      const { main } = packageOptions(name, false);

      expect(main).toBe('dist/app.js');
    });

    it('files include dist', () => {
      const name = 'myapp';
      const { files } = packageOptions(name, false);

      expect(files).toStrictEqual(['/dist']);
    });

    it('can have typings', () => {
      const name = 'myapp';
      const { typings } = packageOptions(name, false, true);

      expect(typings).toBe('dist/app.d.ts');
    });
  });

  describe('when is yeoman generator', () => {
    it('main file', () => {
      const name = 'myapp';
      const { main } = packageOptions(name, false, false, false, true);

      expect(main).toBe('generators/app/index.js');
    });

    it('files include dist', () => {
      const name = 'myapp';
      const { files } = packageOptions(name, false, false, false, true);

      expect(files).toStrictEqual(['/generators']);
    });

    it('can have typings', () => {
      const name = 'myapp';
      const { typings } = packageOptions(name, false, true, false, true);

      expect(typings).toBe('generators/app/index.d.ts');
    });
  });

  it('web components have side effects', () => {
    const name = 'myapp';
    const { sideEffects } = packageOptions(name, true, false, true);

    expect(sideEffects).toBeUndefined();
  });

  it('by default there are noside effects', () => {
    const name = 'myapp';
    const { sideEffects } = packageOptions(name);

    expect(sideEffects).toBe(false);
  });
});
