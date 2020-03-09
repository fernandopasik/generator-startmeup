import store from './store';

const get = (groupName: string = 'dependencies'): string[] => {
  return Array.from(store[groupName].values());
};

export default get;
