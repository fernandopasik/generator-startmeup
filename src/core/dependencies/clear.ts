import store from './store';

const clear = (): void => {
  Object.keys(store).forEach((group: string) => {
    store[group].clear();
  });
};

export default clear;
