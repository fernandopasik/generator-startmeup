import type { PackageJson } from 'type-fest';

const packageOptions = (
  appName: string,
  isLibrary = true,
  hasTypescript = false,
  hasLit = false,
): Pick<PackageJson, 'files' | 'main' | 'module' | 'sideEffects' | 'type' | 'typings'> => {
  const main = isLibrary ? `${appName}.js` : 'dist/app.js';
  const files = isLibrary ? ['/lib', `/${appName}.*`] : ['/dist'];

  const options: Pick<
    PackageJson,
    'files' | 'main' | 'module' | 'sideEffects' | 'type' | 'typings'
  > = { type: 'module', main, module: main, files };

  if (hasTypescript) {
    options.typings = `${appName}.d.ts`;
  }

  if (!hasLit) {
    options.sideEffects = false;
  }

  return options;
};

export default packageOptions;
