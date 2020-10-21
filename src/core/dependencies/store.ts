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

export const groupAliases: Record<string, string> = {
  dependencies: 'dep',
  devDependencies: 'dev',
  optionalDependencies: 'optional',
  peerDependencies: 'peer',
};

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const store: Record<string, Set<string>> = groupNames.reduce(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  (acc: Record<string, Set<string>>, groupName: string) => {
    acc[groupAliases[groupName]] = new Set();
    return acc;
  },
  {},
);

export default store;
