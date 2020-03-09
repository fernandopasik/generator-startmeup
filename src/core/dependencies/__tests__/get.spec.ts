import add from '../add';
import clear from '../clear';
import get from '../get';

describe('get', () => {
  beforeEach(() => {
    clear();
  });

  it('dependencies', () => {
    add('react', 'dependencies');
    add('react-dom', 'dependencies');

    expect(get('dependencies')).toStrictEqual(['react', 'react-dom']);
  });

  it('dependencies if no group provided', () => {
    add('react', 'dependencies');
    add('react-dom', 'dependencies');

    expect(get()).toStrictEqual(['react', 'react-dom']);
  });

  it('dependencies from other groups', () => {
    add('react', 'dependencies');
    add('jest', 'devDependencies');
    add('enzyme', 'devDependencies');

    expect(get('devDependencies')).toStrictEqual(['jest', 'enzyme']);
  });
});
