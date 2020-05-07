import add from '../add';
import clear from '../clear';
import has from '../has';

describe('remove all', () => {
  beforeEach(() => {
    clear();
  });

  it('dependencies', () => {
    add('react', 'dep');
    add('react-dom', 'dep');

    expect(has('react', 'dep')).toBe(true);
    expect(has('react-dom', 'dep')).toBe(true);

    clear();

    expect(has('react', 'dep')).toBe(false);
    expect(has('react-dom', 'dep')).toBe(false);
  });

  it('from all groups', () => {
    add('react', 'dep');
    add('react-dom', 'peer');
    add('jquery', 'optional');
    add('jest', 'dev');

    expect(has('react', 'dep')).toBe(true);
    expect(has('jest', 'dev')).toBe(true);
    expect(has('react-dom', 'peer')).toBe(true);
    expect(has('jquery', 'optional')).toBe(true);

    clear();

    expect(has('react', 'dep')).toBe(false);
    expect(has('jest', 'dev')).toBe(false);
    expect(has('react-dom', 'peer')).toBe(false);
    expect(has('jquery', 'optional')).toBe(false);
  });
});
