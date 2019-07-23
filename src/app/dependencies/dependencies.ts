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
  if (pkg.dependencies) {
    add(Object.keys(pkg.dependencies));
  }

  if (pkg.devDependencies) {
    addDev(Object.keys(pkg.devDependencies));
  }
};

export const clearAll = (): void => {
  dependencies.clear();
  devDependencies.clear();
};

export const has = (name: string): boolean => dependencies.has(name) || devDependencies.has(name);

export const get = (): string[] => Array.from(dependencies);
export const getDev = (): string[] => Array.from(devDependencies);
