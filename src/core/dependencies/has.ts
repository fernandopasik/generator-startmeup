import store from './store';

const has = (name: string, groupName: string | 'all' = 'dep'): boolean => {
  if (groupName === 'all') {
    return Object.keys(store).reduce(
      (acc: boolean, group: string): boolean => acc || has(name, group),
      false,
    );
  }

  return store[groupName].has(name);
};

export default has;
