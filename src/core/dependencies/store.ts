export interface All {
  [groupName: string]: Set<string>;
}

export const groupNames = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
];

export type GroupNames =
  | 'dependencies'
  | 'devDependencies'
  | 'optionalDependencies'
  | 'peerDependencies';

const store: All = groupNames.reduce((acc: All, groupName: string) => {
  acc[groupName] = new Set();
  return acc;
}, {} as All);

export default store;
