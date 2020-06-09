import { mocked } from 'ts-jest/utils';
import load from '../../configs/load';
import clear from '../clear';
import get from '../get';
import has from '../has';
import importAll from '../import-all';

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

    expect(has('react', 'dep')).toBe(true);
    expect(has('react-dom', 'dep')).toBe(true);
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

    expect(has('react', 'dep')).toBe(true);
    expect(has('react-dom', 'dep')).toBe(true);
    expect(has('jest', 'dev')).toBe(true);
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

    expect(has('react', 'peer')).toBe(true);
    expect(has('react', 'dev')).toBe(true);
    expect(has('react', 'dep')).toBe(false);
    expect(has('react-dom', 'peer')).toBe(true);
    expect(has('react-dom', 'dev')).toBe(true);
    expect(has('react-dom', 'dep')).toBe(false);
  });

  it('deals with empty package.json', async () => {
    await importAll();
    expect(get('dep')).toStrictEqual([]);
    expect(get('dev')).toStrictEqual([]);
    expect(get('peer')).toStrictEqual([]);
    expect(get('optional')).toStrictEqual([]);
  });
});
