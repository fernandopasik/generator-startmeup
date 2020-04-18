export interface All {
  [groupName: string]: Set<string>;
}

export const groupNames = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
];

/* eslint-disable @typescript-eslint/no-type-alias */
export type GroupNames =
  | 'dependencies'
  | 'devDependencies'
  | 'optionalDependencies'
  | 'peerDependencies';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const store: All = groupNames.reduce((acc: All, groupName: string) => {
  acc[groupName] = new Set();
  return acc;
}, {});

export default store;
