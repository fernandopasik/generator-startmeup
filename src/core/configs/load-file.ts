import currentPath from './current-path';
import store, { Config } from './store';

interface ConfigFile {
  default: Config;
}

const loadFile = async (filename: string): Promise<Config> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { default: config } = (await import(currentPath(filename))) as ConfigFile;
  store.set('filename', config);
  return config;
};

export default loadFile;
