import currentPath from './current-path';
import store, { Config } from './store';

const load = async (filename: string, initial?: Config): Promise<Config | undefined> => {
  if (store.has(filename)) {
    return store.get(filename);
  }

  try {
    const { default: config } = await import(currentPath(filename));
    store.set('filename', config);
    return config;
  } catch (error) {
    if (typeof initial === 'undefined') {
      return undefined;
    }

    store.set('filename', initial);
    return initial;
  }
};

export default load;
