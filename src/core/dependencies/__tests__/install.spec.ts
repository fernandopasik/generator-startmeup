import { mocked } from 'ts-jest/utils';
import { sync } from 'cross-spawn';
import install, { groupParameters } from '../install';
import get from '../get';

jest.mock('cross-spawn', () => ({
  sync: jest.fn(),
}));

jest.mock('../get', () => jest.fn());

describe('install', () => {
  beforeEach(() => {
    mocked(sync).mockClear();
    mocked(get).mockReset();
  });

  describe('one group of dependencies', () => {
    describe('gets dependencies from store', () => {
      it('before installing', () => {
        mocked(get).mockReturnValueOnce([]);

        install('dependencies');

        expect(get).toHaveBeenCalledTimes(1);
      });

      it('matching the provided group name', () => {
        mocked(get).mockReturnValueOnce([]);
        const groupName = 'devDependencies';

        install(groupName);

        expect(get).toHaveBeenCalledWith(groupName);
      });

      it('returning the list for the groupname', () => {
        const dependencies = ['yeoman', 'typescript'];
        mocked(get).mockReturnValueOnce(dependencies);

        install('dependencies');

        expect(get).toHaveReturnedWith(dependencies);
      });

      it('is cancelled when non installable group provided', () => {
        mocked(get).mockReturnValueOnce([]);

        install('optionalDependencies');

        expect(get).toHaveBeenCalledTimes(0);
      });
    });

    describe('spanws', () => {
      beforeEach(() => {
        mocked(get).mockReturnValue(['yeoman']);
      });

      it('cancelled if no dependencies to install', () => {
        mocked(get).mockReset();
        mocked(get).mockReturnValueOnce([]);

        install('dependencies');

        expect(sync).toHaveBeenCalledTimes(0);
      });

      it('a command', () => {
        install('dependencies');

        expect(sync).toHaveBeenCalledTimes(1);
      });

      it('yarn', () => {
        install('dependencies');

        expect(sync).toHaveBeenCalledWith('yarn', expect.anything(), expect.anything());
      });

      it('displays output in screen', () => {
        install('dependencies');

        const options = { stdio: 'inherit' };
        expect(sync).toHaveBeenCalledWith(expect.anything(), expect.anything(), options);
      });

      it('yarn add', () => {
        install('dependencies');

        const [, parameters = []] = mocked(sync).mock.calls[0];
        expect(parameters[0]).toStrictEqual('add');
      });

      it('yarn add to the corresponding group', () => {
        install('devDependencies');
        install('dependencies');

        const [, parameters1 = []] = mocked(sync).mock.calls[0];
        expect(parameters1[1]).toStrictEqual('-D');

        const [, parameters2 = []] = mocked(sync).mock.calls[1];
        expect(parameters2[1]).toStrictEqual('');
      });

      it('yarn add the list of dependencies', () => {
        mocked(get).mockReset();
        const dependencies = ['typescript', 'eslint'];
        mocked(get).mockReturnValueOnce(dependencies);

        install('devDependencies');

        const [, parameters = []] = mocked(sync).mock.calls[0];
        expect(parameters.slice(2)).toStrictEqual(dependencies);
      });
    });
  });

  describe('all groups of dependencies when no group name provided', () => {
    describe('gets dependencies from store', () => {
      it('before installing', () => {
        mocked(get).mockReturnValue([]);

        install();

        const groupsNames = Object.keys(groupParameters);
        expect(get).toHaveBeenCalledTimes(groupsNames.length);
      });

      it('matching all the group names', () => {
        mocked(get).mockReturnValue([]);

        install();

        const groupsNames = Object.keys(groupParameters);
        groupsNames.forEach((groupName: string, index: number): void => {
          expect(get).toHaveBeenNthCalledWith(index + 1, groupName);
        });
      });

      it('returning the list for the groupname', () => {
        const dependencies = ['jquery'];
        const peerDependencies = ['react'];
        const devDependencies = ['yeoman', 'typescript'];
        mocked(get).mockReturnValueOnce(dependencies);
        mocked(get).mockReturnValueOnce(peerDependencies);
        mocked(get).mockReturnValueOnce(devDependencies);

        install();

        expect(get).toHaveReturnedWith(dependencies);
        expect(get).toHaveReturnedWith(devDependencies);
      });
    });

    describe('spanws', () => {
      beforeEach(() => {
        mocked(get).mockReturnValueOnce(['jquery']);
        mocked(get).mockReturnValueOnce(['react']);
        mocked(get).mockReturnValueOnce(['yeoman', 'typescript']);
      });

      it('cancelled if no dependencies to install', () => {
        mocked(get).mockReset();
        mocked(get).mockReturnValueOnce([]);
        mocked(get).mockReturnValueOnce([]);
        mocked(get).mockReturnValueOnce([]);

        install();

        expect(sync).toHaveBeenCalledTimes(0);
      });

      it('multiples commands', () => {
        install();

        expect(sync).toHaveBeenCalledTimes(3);
      });

      it('yarn', () => {
        install();

        expect(sync).toHaveBeenCalledWith('yarn', expect.anything(), expect.anything());
      });

      it('yarn add', () => {
        install('dependencies');

        const [, parameters = []] = mocked(sync).mock.calls[0];
        expect(parameters[0]).toStrictEqual('add');
      });

      it('yarn add to all groups', () => {
        install();

        const [, parameters1 = []] = mocked(sync).mock.calls[0];
        expect(parameters1[1]).toStrictEqual('');

        const [, parameters2 = []] = mocked(sync).mock.calls[1];
        expect(parameters2[1]).toStrictEqual('-P');

        const [, parameters3 = []] = mocked(sync).mock.calls[2];
        expect(parameters3[1]).toStrictEqual('-D');
      });

      it('yarn add the list of dependencies for all groups', () => {
        mocked(get).mockReset();
        const dependencies = ['jquery'];
        const peerDependencies = ['react'];
        const devDependencies = ['typescript', 'eslint'];
        mocked(get).mockReturnValueOnce(dependencies);
        mocked(get).mockReturnValueOnce(peerDependencies);
        mocked(get).mockReturnValueOnce(devDependencies);

        install();

        const [, parameters1 = []] = mocked(sync).mock.calls[0];
        expect(parameters1.slice(2)).toStrictEqual(dependencies);

        const [, parameters2 = []] = mocked(sync).mock.calls[1];
        expect(parameters2.slice(2)).toStrictEqual(peerDependencies);

        const [, parameters3 = []] = mocked(sync).mock.calls[2];
        expect(parameters3.slice(2)).toStrictEqual(devDependencies);
      });
    });
  });
});
