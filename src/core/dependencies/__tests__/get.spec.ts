import add from '../add';
import clear from '../clear';
import get from '../get';

describe('get', () => {
  beforeEach(() => {
    clear();
  });

  it('dependencies', () => {
    add('react', 'dep');
    add('react-dom', 'dep');

    expect(get('dep')).toStrictEqual(['react', 'react-dom']);
  });

  it('dependencies if no group provided', () => {
    add('react', 'dep');
    add('react-dom', 'dep');

    expect(get()).toStrictEqual(['react', 'react-dom']);
  });

  it('dependencies from other groups', () => {
    add('react', 'dep');
    add('jest', 'dev');
    add('enzyme', 'dev');

    expect(get('dev')).toStrictEqual(['jest', 'enzyme']);
  });
});
