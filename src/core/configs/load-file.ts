import currentPath from './current-path';
import store, { Config } from './store';

const loadFile = async <T = Config>(filename: string): Promise<T> => {
  const { default: config } = (await import(currentPath(filename))) as { default: T };
  store.set(filename, config);
  return config;
};

export default loadFile;
