import store, { Config } from './store';

const set = (filename: string, config: Readonly<Config>): void => {
  store.set(filename, config);
};

export default set;
