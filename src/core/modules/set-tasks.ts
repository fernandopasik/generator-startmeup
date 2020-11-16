import sortPackageJson from 'sort-package-json';
import type { PackageJson } from 'type-fest';
import { load as loadConfig, set as setConfig } from '../configs';
import store from './store';

const setTasks = async (moduleName: string): Promise<void> => {
  if (!store.has(moduleName)) {
    return;
  }
  const moduleConfig = store.get(moduleName);

  const pkg = await loadConfig<PackageJson>('package.json');

  const newPkg = {
    ...pkg,
    scripts: {
      ...(pkg?.scripts ?? {}),
      ...(moduleConfig?.tasks ?? {}),
    },
  };

  setConfig('package.json', sortPackageJson(newPkg));
};

export default setTasks;
