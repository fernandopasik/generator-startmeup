import type { Config } from '../configs';

export interface ModuleMainDependency {
  name: string;
  type: string;
}

export interface ModuleConfig {
  mainDependencies: ModuleMainDependency[];
  configFilename: string;
  configContent: Config | (() => Config);
  confirm?: boolean;
  confirmMessage?: string;
  name: string;
  replaceConfig: boolean;
  tasks?: Record<string, string>;
}

const store = new Map<string, ModuleConfig>();

export default store;
