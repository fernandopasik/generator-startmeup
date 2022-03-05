import type { PackageJson } from 'type-fest';
import sortProps from '../utils/sort-props.js';

const packageOptions = (
  appName: string,
  isLibrary = true,
  isModule = true,
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
  > = { main, files };

  if (isModule) {
    options.type = 'module';
    options.module = main;
  } else {
    options.type = 'commonjs';
  }

  if (hasTypescript) {
    options.typings = isLibrary ? `${appName}.d.ts` : `${appFolder}/${appFile}.d.ts`;
  }

  if (!hasLit) {
    options.sideEffects = false;
  }

  return sortProps(options);
};

export default packageOptions;
