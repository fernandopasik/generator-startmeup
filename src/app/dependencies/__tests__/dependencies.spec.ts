import { add, addDev, addFromPkg, clearAll, get, getDev, has, hasDev } from '../dependencies';

describe('dependencies', () => {
  describe('add', () => {
    beforeEach(() => {
      clearAll();
    });

    it('one new dependency', () => {
      add('jquery');

      expect(has('jquery')).toBe(true);
    });

    it('some new dependencies', () => {
      add(['jquery', 'lodash']);

      expect(has('jquery')).toBe(true);
      expect(has('lodash')).toBe(true);
    });
  });

  describe('addDev', () => {
    beforeEach(() => {
      clearAll();
    });

    it('one new dev dependency', () => {
      addDev('jest');

      expect(has('jest')).toBe(true);
    });

    it('some new dev dependencies', () => {
      addDev(['eslint', 'jest']);

      expect(has('eslint')).toBe(true);
      expect(has('jest')).toBe(true);
    });
  });

  describe('addFromPkg', () => {
    beforeEach(() => {
      clearAll();
    });

    it('handle empty pkg', () => {
      expect(() => addFromPkg()).not.toThrow();
    });

    it('no dependencies', () => {
      addFromPkg({});

      expect(get()).toStrictEqual([]);
      expect(getDev()).toStrictEqual([]);
    });

    it('dependencies', () => {
      addFromPkg({
        dependencies: {
          dep1: '*',
          dep2: '*',
          dep3: '*',
        },
      });

      expect(get()).toStrictEqual(['dep1', 'dep2', 'dep3']);
      expect(getDev()).toStrictEqual([]);
    });

    it('dev dependencies', () => {
      addFromPkg({
        devDependencies: {
          dep1: '*',
          dep2: '*',
          dep3: '*',
        },
      });

      expect(get()).toStrictEqual([]);
      expect(getDev()).toStrictEqual(['dep1', 'dep2', 'dep3']);
    });

    it('dev dependencies and dependencies', () => {
      addFromPkg({
        dependencies: {
          dep1: '*',
          dep2: '*',
          dep3: '*',
        },
        devDependencies: {
          dep4: '*',
          dep5: '*',
        },
      });

      expect(get()).toStrictEqual(['dep1', 'dep2', 'dep3']);
      expect(getDev()).toStrictEqual(['dep4', 'dep5']);
    });
  });

  describe('has', () => {
    beforeEach(() => {
      clearAll();
    });

    it('in dev dependencies or dependencies', () => {
      addDev('eslint');
      add('jquery');

      expect(has('eslint')).toBe(true);
      expect(has('jquery')).toBe(true);
    });
  });

  describe('hasDev', () => {
    beforeEach(() => {
      clearAll();
    });

    it('are empty', () => {
      expect(hasDev('eslint')).toBe(false);
    });

    it('with one', () => {
      addDev('eslint');
      expect(hasDev('eslint')).toBe(true);
    });

    it('with more than one', () => {
      addDev('eslint');
      addDev('jest');
      expect(hasDev('eslint')).toBe(true);
    });

    it('with none on dev', () => {
      add('jquery');
      expect(hasDev('jquery')).toBe(false);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      clearAll();
    });

    it('empty dependencies', () => {
      expect(get()).toStrictEqual([]);
    });

    it('all dependencies', () => {
      const deps = ['jquery', 'lodash'];
      add(deps);

      expect(get()).toStrictEqual(deps);
    });
  });

  describe('getDev', () => {
    beforeEach(() => {
      clearAll();
    });

    it('empty dev dependencies', () => {
      expect(getDev()).toStrictEqual([]);
    });

    it('all dev dependencies', () => {
      const deps = ['eslint', 'jest'];
      addDev(deps);

      expect(getDev()).toStrictEqual(deps);
    });
  });
});
