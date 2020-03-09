import { add, get, has, remove, clear, importFromPkg } from '../dependencies';

describe('dependencies', () => {
  beforeEach(() => {
    clear();
  });

  describe('add', () => {
    it('one dependency', () => {
      expect(has('react', 'dependencies')).toBe(false);

      add('react', 'dependencies');

      expect(has('react', 'dependencies')).toBe(true);
    });

    it('more than one dependency', () => {
      add('react', 'dependencies');
      add('react-dom', 'dependencies');

      expect(has('react', 'dependencies')).toBe(true);
      expect(has('react-dom', 'dependencies')).toBe(true);
    });

    it('by default it adds to dependencies when no group provided', () => {
      add('react');

      expect(has('react', 'dependencies')).toBe(true);
      expect(has('react', 'devDependencies')).toBe(false);
    });

    it('to devDependencies', () => {
      add('jest', 'devDependencies');

      expect(has('jest', 'devDependencies')).toBe(true);
      expect(has('jest', 'dependencies')).toBe(false);
    });

    it('to peerDependencies', () => {
      add('react', 'peerDependencies');

      expect(has('react', 'peerDependencies')).toBe(true);
      expect(has('react', 'dependencies')).toBe(false);
    });

    it('when adding to peerDependencies also keep in devDependencies for development', () => {
      add('react', 'peerDependencies');

      expect(has('react', 'peerDependencies')).toBe(true);
      expect(has('react', 'devDependencies')).toBe(true);
      expect(has('react', 'dependencies')).toBe(false);
    });

    it('to optionalDependencies', () => {
      add('react', 'optionalDependencies');

      expect(has('react', 'optionalDependencies')).toBe(true);
      expect(has('react', 'dependencies')).toBe(false);
    });
  });

  describe('get', () => {
    it('dependencies', () => {
      add('react', 'dependencies');
      add('react-dom', 'dependencies');

      expect(get('dependencies')).toStrictEqual(['react', 'react-dom']);
    });

    it('dependencies if no group provided', () => {
      add('react', 'dependencies');
      add('react-dom', 'dependencies');

      expect(get()).toStrictEqual(['react', 'react-dom']);
    });

    it('dependencies from other groups', () => {
      add('react', 'dependencies');
      add('jest', 'devDependencies');
      add('enzyme', 'devDependencies');

      expect(get('devDependencies')).toStrictEqual(['jest', 'enzyme']);
    });
  });

  describe('has', () => {
    it('a dependency', () => {
      add('react', 'dependencies');

      expect(has('react', 'dependencies')).toBe(true);
    });

    it('a dependency from other groups', () => {
      add('jest', 'devDependencies');

      expect(has('jest', 'devDependencies')).toBe(true);
      expect(has('jest', 'dependencies')).toBe(false);
    });

    it('dependencies if no group provided', () => {
      add('react', 'dependencies');

      expect(has('react')).toBe(true);
    });

    it('in all groups', () => {
      add('react');

      expect(has('react', 'all')).toBe(true);
    });
  });

  describe('remove', () => {
    it('a dependency', () => {
      add('react', 'dependencies');
      expect(has('react', 'dependencies')).toBe(true);

      remove('react', 'dependencies');

      expect(has('react', 'dependencies')).toBe(false);
    });

    it('a dependency from other groups', () => {
      add('jest', 'devDependencies');
      expect(has('jest', 'devDependencies')).toBe(true);

      remove('jest', 'devDependencies');

      expect(has('jest', 'devDependencies')).toBe(false);
    });

    it('dependencies if no group provided', () => {
      add('react', 'dependencies');
      expect(has('react', 'dependencies')).toBe(true);

      remove('react');

      expect(has('react', 'dependencies')).toBe(false);
    });

    it('a dependency from all groups', () => {
      add('react');
      add('react', 'devDependencies');
      add('react', 'peerDependencies');

      remove('react', 'all');

      expect(has('react', 'all')).toBe(false);
    });

    it('a peerDependency removes also from devDependencies', () => {
      add('react', 'peerDependencies');

      expect(has('react', 'peerDependencies')).toBe(true);
      expect(has('react', 'devDependencies')).toBe(true);

      remove('react', 'peerDependencies');

      expect(has('react', 'peerDependencies')).toBe(false);
      expect(has('react', 'devDependencies')).toBe(false);
    });
  });

  describe('remove all', () => {
    it('dependencies', () => {
      add('react', 'dependencies');
      add('react-dom', 'dependencies');

      expect(has('react', 'dependencies')).toBe(true);
      expect(has('react-dom', 'dependencies')).toBe(true);

      clear();

      expect(has('react', 'dependencies')).toBe(false);
      expect(has('react-dom', 'dependencies')).toBe(false);
    });

    it('from all groups', () => {
      add('react', 'dependencies');
      add('react-dom', 'peerDependencies');
      add('jquery', 'optionalDependencies');
      add('jest', 'devDependencies');

      expect(has('react', 'dependencies')).toBe(true);
      expect(has('jest', 'devDependencies')).toBe(true);
      expect(has('react-dom', 'peerDependencies')).toBe(true);
      expect(has('jquery', 'optionalDependencies')).toBe(true);

      clear();

      expect(has('react', 'dependencies')).toBe(false);
      expect(has('jest', 'devDependencies')).toBe(false);
      expect(has('react-dom', 'peerDependencies')).toBe(false);
      expect(has('jquery', 'optionalDependencies')).toBe(false);
    });
  });

  describe('import from package.json', () => {
    it('dependencies', () => {
      importFromPkg({
        name: 'name',
        version: '',
        dependencies: {
          react: '*',
          'react-dom': '*',
        },
      });

      expect(has('react', 'dependencies')).toBe(true);
      expect(has('react-dom', 'dependencies')).toBe(true);
    });

    it('other dependency groups', () => {
      importFromPkg({
        name: 'name',
        version: '',
        dependencies: {
          react: '*',
          'react-dom': '*',
        },
        devDependencies: {
          jest: '*',
        },
      });

      expect(has('react', 'dependencies')).toBe(true);
      expect(has('react-dom', 'dependencies')).toBe(true);
      expect(has('jest', 'devDependencies')).toBe(true);
    });

    it('peerDependencies add devDependencies as well', () => {
      importFromPkg({
        name: 'name',
        version: '',
        peerDependencies: {
          react: '*',
          'react-dom': '*',
        },
      });

      expect(has('react', 'peerDependencies')).toBe(true);
      expect(has('react', 'devDependencies')).toBe(true);
      expect(has('react', 'dependencies')).toBe(false);
      expect(has('react-dom', 'peerDependencies')).toBe(true);
      expect(has('react-dom', 'devDependencies')).toBe(true);
      expect(has('react-dom', 'dependencies')).toBe(false);
    });

    it('deals with empty package.json', () => {
      expect(() => importFromPkg()).not.toThrow();
    });
  });
});
