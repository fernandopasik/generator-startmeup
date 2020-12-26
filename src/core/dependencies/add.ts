import store from './store';

const add = (name: string, groupName = 'dep'): void => {
  store[groupName].add(name);

  if (groupName === 'peer') {
    add(name, 'dev');
  }
};

export default add;
