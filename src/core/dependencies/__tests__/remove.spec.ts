import add from '../add';
import clear from '../clear';
import has from '../has';
import remove from '../remove';

describe('remove', () => {
  beforeEach(() => {
    clear();
  });

  it('a dependency', () => {
    add('react', 'dep');
    expect(has('react', 'dep')).toBe(true);

    remove('react', 'dep');

    expect(has('react', 'dep')).toBe(false);
  });

  it('a dependency from other groups', () => {
    add('jest', 'dev');
    expect(has('jest', 'dev')).toBe(true);

    remove('jest', 'dev');

    expect(has('jest', 'dev')).toBe(false);
  });

  it('dependencies if no group provided', () => {
    add('react', 'dep');
    expect(has('react', 'dep')).toBe(true);

    remove('react');

    expect(has('react', 'dep')).toBe(false);
  });

  it('a dependency from all groups', () => {
    add('react');
    add('react', 'dev');
    add('react', 'peer');

    remove('react', 'all');

    expect(has('react', 'all')).toBe(false);
  });

  it('a peerDependency removes also from dev dependencies', () => {
    add('react', 'peer');

    expect(has('react', 'peer')).toBe(true);
    expect(has('react', 'dev')).toBe(true);

    remove('react', 'peer');

    expect(has('react', 'peer')).toBe(false);
    expect(has('react', 'dev')).toBe(false);
  });
});
