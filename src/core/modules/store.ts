import { Config } from '../configs';

export interface moduleMainDependency {
  name: string;
  type: string;
}

export interface ModuleConfig {
  mainDependencies: moduleMainDependency[];
  configFilename: string;
  configContent: Config;
  confirm?: boolean;
  confirmMessage?: string;
  name: string;
  replaceConfig: boolean;
}

const store = new Map<string, ModuleConfig>();

export default store;
