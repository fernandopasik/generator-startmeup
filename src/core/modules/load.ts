import store, { ModuleConfig } from './store';

const load = (moduleName: string, moduleConfig: Readonly<ModuleConfig>): void => {
  store.set(moduleName, moduleConfig);
};

export default load;
