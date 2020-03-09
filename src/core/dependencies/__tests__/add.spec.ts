import add from '../add';
import clear from '../clear';
import has from '../has';

describe('add', () => {
  beforeEach(() => {
    clear();
  });

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
