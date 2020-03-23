import { mocked } from 'ts-jest/utils';
import clear from '../clear';
import has from '../has';
import get from '../get';
import importAll from '../import-all';
import load from '../../configs/load';

jest.mock('../../configs/load', () => jest.fn());

describe('import all', () => {
  beforeEach(() => {
    clear();
  });

  it('dependencies', async () => {
    mocked(load).mockResolvedValueOnce({
      name: 'name',
      version: '',
      dependencies: {
        react: '*',
        'react-dom': '*',
      },
    });

    await importAll();

    expect(has('react', 'dependencies')).toBe(true);
    expect(has('react-dom', 'dependencies')).toBe(true);
  });

  it('other dependency groups', async () => {
    mocked(load).mockResolvedValueOnce({
      name: 'name',
      version: '',
      dependencies: {
        react: '*',
        'react-dom': '*',
      },
      devDependencies: {
        jest: '*',
      },
    });
    await importAll();

    expect(has('react', 'dependencies')).toBe(true);
    expect(has('react-dom', 'dependencies')).toBe(true);
    expect(has('jest', 'devDependencies')).toBe(true);
  });

  it('peerDependencies add devDependencies as well', async () => {
    mocked(load).mockResolvedValueOnce({
      name: 'name',
      version: '',
      peerDependencies: {
        react: '*',
        'react-dom': '*',
      },
    });
    await importAll();

    expect(has('react', 'peerDependencies')).toBe(true);
    expect(has('react', 'devDependencies')).toBe(true);
    expect(has('react', 'dependencies')).toBe(false);
    expect(has('react-dom', 'peerDependencies')).toBe(true);
    expect(has('react-dom', 'devDependencies')).toBe(true);
    expect(has('react-dom', 'dependencies')).toBe(false);
  });

  it('deals with empty package.json', async () => {
    await importAll();
    expect(get('dependencies')).toStrictEqual([]);
    expect(get('devDependencies')).toStrictEqual([]);
    expect(get('peerDependencies')).toStrictEqual([]);
    expect(get('optionalDependencies')).toStrictEqual([]);
  });
});
