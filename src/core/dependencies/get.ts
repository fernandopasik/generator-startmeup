import store from './store';

const get = (groupName = 'dep'): string[] => {
  return Array.from(store[groupName].values());
};

export default get;
