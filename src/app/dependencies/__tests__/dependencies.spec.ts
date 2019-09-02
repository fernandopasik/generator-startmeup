import { add, addDev, addFromPkg, clearAll, get, getDev, has } from '../dependencies';

describe('Dependencies', () => {
  describe('add', () => {
    beforeEach(() => {
      clearAll();
    });

    test('one new dependency', () => {
      add('jquery');

      expect(has('jquery')).toBe(true);
    });

    test('some new dependencies', () => {
      add(['jquery', 'lodash']);

      expect(has('jquery')).toBe(true);
      expect(has('lodash')).toBe(true);
    });
  });

  describe('addDev', () => {
    beforeEach(() => {
      clearAll();
    });

    test('one new dev dependency', () => {
      addDev('jest');

      expect(has('jest')).toBe(true);
    });

    test('some new dev dependencies', () => {
      addDev(['eslint', 'jest']);

      expect(has('eslint')).toBe(true);
      expect(has('jest')).toBe(true);
    });
  });

  describe('addFromPkg', () => {
    beforeEach(() => {
      clearAll();
    });

    test('handle empty pkg', () => {
      expect(() => addFromPkg()).not.toThrow();
    });

    test('no dependencies', () => {
      addFromPkg({});

      expect(get()).toStrictEqual([]);
      expect(getDev()).toStrictEqual([]);
    });

    test('dependencies', () => {
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

    test('dev dependencies', () => {
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

    test('dev dependencies and dependencies', () => {
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

    test('in dev dependencies or dependencies', () => {
      addDev('eslint');
      add('jquery');

      expect(has('eslint')).toBe(true);
      expect(has('jquery')).toBe(true);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      clearAll();
    });

    test('empty dependencies', () => {
      expect(get()).toStrictEqual([]);
    });

    test('all dependencies', () => {
      const deps = ['jquery', 'lodash'];
      add(deps);

      expect(get()).toStrictEqual(deps);
    });
  });

  describe('getDev', () => {
    beforeEach(() => {
      clearAll();
    });

    test('empty dev dependencies', () => {
      expect(getDev()).toStrictEqual([]);
    });

    test('all dev dependencies', () => {
      const deps = ['eslint', 'jest'];
      addDev(deps);

      expect(getDev()).toStrictEqual(deps);
    });
  });
});
