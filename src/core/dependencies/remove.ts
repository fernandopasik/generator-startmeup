import store from './store';

const remove = (name: string, groupName: string | 'all' = 'dependencies'): void => {
  if (groupName === 'all') {
    Object.keys(store).forEach((group: string) => {
      store[group].delete(name);
    });
  } else {
    store[groupName].delete(name);

    if (groupName === 'peerDependencies') {
      remove(name, 'devDependencies');
    }
  }
};

export default remove;
