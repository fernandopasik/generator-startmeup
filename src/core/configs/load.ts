import currentPath from './current-path';
import store from './store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-type-alias
export type Config = Record<string, any>;

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
