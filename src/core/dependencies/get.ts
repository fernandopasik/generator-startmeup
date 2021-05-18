import store from './store';

const get = (groupName = 'dep'): string[] => Array.from(store[groupName].values());
export default get;
