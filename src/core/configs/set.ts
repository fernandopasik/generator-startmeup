import type { Config } from './store';
import store from './store';

const set = (filename: string, config: Readonly<Config>): void => {
  store.set(filename, config);
};

export default set;
