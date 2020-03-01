import { PackageJson } from '../packagejson/package-json';

interface All {
  [groupName: string]: Set<string>;
}

const groupNames = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
type GroupNames = 'dependencies' | 'devDependencies' | 'optionalDependencies' | 'peerDependencies';

const all: All = groupNames.reduce((acc, groupName: string) => {
  acc[groupName] = new Set();
  return acc;
}, {} as All);

export const add = (name: string, groupName: string = 'dependencies'): void => {
  all[groupName].add(name);

  if (groupName === 'peerDependencies') {
    add(name, 'devDependencies');
  }
};

export const get = (groupName: string = 'dependencies'): string[] => {
  return Array.from(all[groupName].values());
};

export const has = (name: string, groupName: string | 'all' = 'dependencies'): boolean => {
  if (groupName === 'all') {
    return Object.keys(all).reduce(
      (acc: boolean, group: string): boolean => acc || has(name, group),
      false,
    );
  }

  return all[groupName].has(name);
};

export const remove = (name: string, groupName: string | 'all' = 'dependencies'): void => {
  if (groupName === 'all') {
    Object.keys(all).forEach((group: string) => {
      all[group].delete(name);
    });
  } else {
    all[groupName].delete(name);

    if (groupName === 'peerDependencies') {
      remove(name, 'devDependencies');
    }
  }
};

export const removeAll = (): void => {
  Object.keys(all).forEach((group: string) => {
    all[group].clear();
  });
};

export const importFromPkg = (pkg: PackageJson = { name: '', version: '' }): void => {
  groupNames.forEach((groupName: string): void => {
    const deps = pkg[groupName as GroupNames];

    if (typeof deps !== 'undefined') {
      Object.keys(deps).forEach((dependencyName) => {
        add(dependencyName, groupName);
      });
    }
  });
};
