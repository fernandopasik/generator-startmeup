import { sync } from 'cross-spawn';
import get from './get';

export const groupParameters: Record<string, string> = {
  dep: '',
  peer: '-P',
  dev: '-D',
};

const install = (groupName?: string): void => {
  const groupNames = [];

  if (typeof groupName === 'undefined') {
    groupNames.push(...Object.keys(groupParameters));
  } else if (groupName in groupParameters) {
    groupNames.push(groupName);
  }

  groupNames.forEach((group: string): void => {
    const dependencies = get(group);
    if (dependencies.length > 0) {
      sync('yarn', ['add', groupParameters[group], ...dependencies], { stdio: 'inherit' });
    }
  });
};

export default install;
