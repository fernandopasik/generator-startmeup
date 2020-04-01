import { has } from '../dependencies';
import store, { moduleMainDependency } from './store';

const isPresent = (moduleName: string): boolean => {
  if (!store.has(moduleName)) {
    return false;
  }
  const moduleConfig = store.get(moduleName);

  const hasAnyMainDependencies = (moduleConfig?.mainDependencies ?? []).reduce(
    (acc: boolean, dependency: Readonly<moduleMainDependency>): boolean =>
      acc || has(dependency.name, dependency.type),
    false,
  );

  if (hasAnyMainDependencies) {
    return true;
  }

  return false;
};

export default isPresent;
