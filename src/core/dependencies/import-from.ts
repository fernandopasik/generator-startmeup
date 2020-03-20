import { PackageJson } from '../../packagejson/package-json';
import { groupNames, GroupNames } from './store';
import add from './add';

const importFrom = (pkg: Readonly<PackageJson> = { name: '', version: '' }): void => {
  groupNames.forEach((groupName: string): void => {
    const deps = pkg[groupName as GroupNames];

    if (typeof deps !== 'undefined') {
      Object.keys(deps).forEach((dependencyName: string) => {
        add(dependencyName, groupName);
      });
    }
  });
};

export default importFrom;
