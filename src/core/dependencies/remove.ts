import store from './store';

const remove = (name: string, groupName: string | 'all' = 'dep'): void => {
  if (groupName === 'all') {
    Object.keys(store).forEach((group: string) => {
      store[group].delete(name);
    });
  } else {
    store[groupName].delete(name);

    if (groupName === 'peer') {
      remove(name, 'dev');
    }
  }
};

export default remove;
