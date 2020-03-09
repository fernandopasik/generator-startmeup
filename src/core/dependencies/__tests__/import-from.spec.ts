import clear from '../clear';
import has from '../has';
import importFrom from '../import-from';

describe('import from', () => {
  beforeEach(() => {
    clear();
  });

  it('dependencies', () => {
    importFrom({
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
    importFrom({
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
    importFrom({
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
    expect(() => importFrom()).not.toThrow();
  });
});
