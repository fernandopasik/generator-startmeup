import add from '../add';
import clear from '../clear';
import has from '../has';

describe('has', () => {
  beforeEach(() => {
    clear();
  });

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
