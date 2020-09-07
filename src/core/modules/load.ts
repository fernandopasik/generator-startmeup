import type { ModuleConfig } from './store';
import store from './store';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const load = (moduleName: string, moduleConfig: Readonly<ModuleConfig>): void => {
  store.set(moduleName, moduleConfig);
};

export default load;
