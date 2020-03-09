import add from '../add';
import clear from '../clear';
import has from '../has';
import remove from '../remove';

describe('remove', () => {
  beforeEach(() => {
    clear();
  });

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
