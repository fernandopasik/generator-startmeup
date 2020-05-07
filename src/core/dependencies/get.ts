import store from './store';

const get = (groupName: string = 'dep'): string[] => {
  return Array.from(store[groupName].values());
};

export default get;
