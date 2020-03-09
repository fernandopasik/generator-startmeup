import store from './store';

const add = (name: string, groupName: string = 'dependencies'): void => {
  store[groupName].add(name);

  if (groupName === 'peerDependencies') {
    add(name, 'devDependencies');
  }
};

export default add;
