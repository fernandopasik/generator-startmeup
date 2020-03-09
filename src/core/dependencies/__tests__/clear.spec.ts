import add from '../add';
import clear from '../clear';
import has from '../has';

describe('remove all', () => {
  beforeEach(() => {
    clear();
  });

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
