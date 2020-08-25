import currentPath from './current-path';
import store, { Config } from './store';

const load = async <T = Config>(filename: string): Promise<T | undefined> => {
  if (store.has(filename)) {
    return store.get(filename) as T;
  }

  try {
    const { default: config } = (await import(currentPath(filename))) as { default: T };
    store.set(filename, config);
    return config;
  } catch (error: unknown) {
    return undefined;
  }
};

export default load;
