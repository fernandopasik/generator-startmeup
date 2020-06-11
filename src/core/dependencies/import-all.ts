// eslint-disable-next-line import/no-extraneous-dependencies
import type { PackageJson } from 'type-fest';
import load from '../configs/load';
import add from './add';
import { groupAliases, groupNames, GroupNames } from './store';

const importAll = async (): Promise<void> => {
  const pkg = await load<PackageJson>('package.json');

  if (typeof pkg === 'undefined') {
    return;
  }

  groupNames.forEach((groupName: string): void => {
    const deps = pkg[groupName as GroupNames];

    if (typeof deps !== 'undefined') {
      Object.keys(deps).forEach((dependencyName: string) => {
        add(dependencyName, groupAliases[groupName]);
      });
    }
  });
};

export default importAll;
