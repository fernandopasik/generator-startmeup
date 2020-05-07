import add from '../add';
import clear from '../clear';
import has from '../has';

describe('has', () => {
  beforeEach(() => {
    clear();
  });

  it('a dependency', () => {
    add('react', 'dep');

    expect(has('react', 'dep')).toBe(true);
  });

  it('a dependency from other groups', () => {
    add('jest', 'dev');

    expect(has('jest', 'dev')).toBe(true);
    expect(has('jest', 'dep')).toBe(false);
  });

  it('dependencies if no group provided', () => {
    add('react', 'dep');

    expect(has('react')).toBe(true);
  });

  it('in all groups', () => {
    add('react');

    expect(has('react', 'all')).toBe(true);
  });
});
