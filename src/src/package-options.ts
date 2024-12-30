import type { PackageJson } from 'type-fest';
import sortProps from '../utils/sort-props.ts';

const packageOptions = (
  appName: string,
  isLibrary = true,
  isModule = true,
  hasTypescript = false,
  hasYeoman = false,
  // eslint-disable-next-line @typescript-eslint/max-params
): Pick<PackageJson, 'files' | 'main' | 'module' | 'type' | 'typings'> => {
  const appFolder = hasYeoman ? 'generators' : 'dist';
  const appFile = hasYeoman ? 'app/index' : 'app';
  const main = isLibrary ? `${appName}.js` : `${appFolder}/${appFile}.js`;
  const files = isLibrary ? ['/lib', `/${appName}.*`] : [`/${appFolder}`];

  const options: Pick<PackageJson, 'files' | 'main' | 'module' | 'type' | 'typings'> = {
    files,
    main,
  };

  if (isModule) {
    options.type = 'module';
    options.module = main;
  } else {
    options.type = 'commonjs';
  }

  if (hasTypescript) {
    options.typings = isLibrary ? `${appName}.d.ts` : `${appFolder}/${appFile}.d.ts`;
  }

  return sortProps(options);
};

export default packageOptions;
