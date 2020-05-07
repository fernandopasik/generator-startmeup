import add from '../add';
import clear from '../clear';
import has from '../has';

describe('add', () => {
  beforeEach(() => {
    clear();
  });

  it('one dependency', () => {
    expect(has('react', 'dep')).toBe(false);

    add('react', 'dep');

    expect(has('react', 'dep')).toBe(true);
  });

  it('more than one dependency', () => {
    add('react', 'dep');
    add('react-dom', 'dep');

    expect(has('react', 'dep')).toBe(true);
    expect(has('react-dom', 'dep')).toBe(true);
  });

  it('by default it adds to dependencies when no group provided', () => {
    add('react');

    expect(has('react', 'dep')).toBe(true);
    expect(has('react', 'dev')).toBe(false);
  });

  it('to dev dependencies', () => {
    add('jest', 'dev');

    expect(has('jest', 'dev')).toBe(true);
    expect(has('jest', 'dep')).toBe(false);
  });

  it('to peer dependencies', () => {
    add('react', 'peer');

    expect(has('react', 'peer')).toBe(true);
    expect(has('react', 'dep')).toBe(false);
  });

  it('when adding to peerDependencies also keep in dev dependencies for development', () => {
    add('react', 'peer');

    expect(has('react', 'peer')).toBe(true);
    expect(has('react', 'dev')).toBe(true);
    expect(has('react', 'dep')).toBe(false);
  });

  it('to optional dependencies', () => {
    add('react', 'optional');

    expect(has('react', 'optional')).toBe(true);
    expect(has('react', 'dep')).toBe(false);
  });
});
