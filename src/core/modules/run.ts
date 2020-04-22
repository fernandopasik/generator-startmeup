import { add as addDependencies } from '../dependencies';
import { set as setConfig } from '../configs';
import confirm from './confirm';
import store, { moduleMainDependency } from './store';

const run = async (moduleName: string): Promise<void> => {
  const config = store.get(moduleName);

  if (typeof config === 'undefined') {
    return;
  }

  if (config.confirm ?? false) {
    const confirmed = await confirm(moduleName, config?.confirmMessage);

    if (confirmed) {
      config.mainDependencies.forEach(({ name, type }: Readonly<moduleMainDependency>) => {
        addDependencies(name, type);
      });

      setConfig(
        config.configFilename,
        typeof config.configContent === 'function' ? config.configContent() : config.configContent,
      );
    }
  }
};

export default run;
