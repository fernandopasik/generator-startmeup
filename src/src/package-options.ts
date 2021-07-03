import type { PackageJson } from 'type-fest';

const packageOptions = (
  appName: string,
  isLibrary = true,
  hasTypescript = false,
  hasLit = false,
  hasYeoman = false,
): Pick<PackageJson, 'files' | 'main' | 'module' | 'sideEffects' | 'type' | 'typings'> => {
  const appFolder = !hasYeoman ? 'dist' : 'generators';
  const appFile = !hasYeoman ? 'app' : 'app/index';
  const main = isLibrary ? `${appName}.js` : `${appFolder}/${appFile}.js`;
  const files = isLibrary ? ['/lib', `/${appName}.*`] : [`/${appFolder}`];

  const options: Pick<
    PackageJson,
    'files' | 'main' | 'module' | 'sideEffects' | 'type' | 'typings'
  > = { type: 'module', main, module: main, files };

  if (hasTypescript) {
    options.typings = isLibrary ? `${appName}.d.ts` : `${appFolder}/${appFile}.d.ts`;
  }

  if (!hasLit) {
    options.sideEffects = false;
  }

  return options;
};

export default packageOptions;
