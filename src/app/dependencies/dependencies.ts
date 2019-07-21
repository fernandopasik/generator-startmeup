export interface Dependencies {
  [name: string]: string;
}

const dependencies: Set<string> = new Set();
const devDependencies: Set<string> = new Set();

export const add = (names: string[] | string): void => {
  if (typeof names === 'string') {
    dependencies.add(names);
  } else {
    names.forEach((name: string): void => {
      dependencies.add(name);
    });
  }
};

export const addDev = (names: string[] | string): void => {
  if (typeof names === 'string') {
    devDependencies.add(names);
  } else {
    names.forEach((name: string): void => {
      devDependencies.add(name);
    });
  }
};

export const clearAll = (): void => {
  dependencies.clear();
  devDependencies.clear();
};

export const has = (name: string): boolean => dependencies.has(name) || devDependencies.has(name);

export const get = (): string[] => Array.from(dependencies);
export const getDev = (): string[] => Array.from(devDependencies);
