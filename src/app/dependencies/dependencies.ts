export interface Dependencies {
  [name: string]: string;
}

interface PackageJson {
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
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

export const addFromPkg = (pkg: PackageJson = {}): void => {
  if ('dependencies' in pkg && typeof pkg.dependencies === 'object') {
    add(Object.keys(pkg.dependencies));
  }

  if ('devDependencies' in pkg && typeof pkg.devDependencies === 'object') {
    addDev(Object.keys(pkg.devDependencies));
  }
};

export const clearAll = (): void => {
  dependencies.clear();
  devDependencies.clear();
};

export const has = (name: string): boolean => dependencies.has(name) || devDependencies.has(name);
export const hasAny = (names: string[]): boolean =>
  names.reduce((response: boolean, name: string): boolean => {
    return response || has(name);
  }, false);

export const get = (): string[] => Array.from(dependencies);
export const getDev = (): string[] => Array.from(devDependencies);
