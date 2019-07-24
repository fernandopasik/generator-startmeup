export const COMPILERS = ['babel', 'typescript'];

interface CompilerDependencies {
  [compilerName: string]: string[];
}

export const COMPILER_DEPENDENCIES: CompilerDependencies = {
  babel: ['@babel/cli', '@babel/core', '@babel/preset-env'],
  typescript: ['typescript', '@babel/preset-typescript'],
};

interface DependenciesCompiler {
  [dependencyName: string]: string;
}

export const DEPENDENCIES_COMPILER: DependenciesCompiler = Object.keys(
  COMPILER_DEPENDENCIES,
).reduce(
  (dependenciesMap: DependenciesCompiler, compilerName: string): DependenciesCompiler => ({
    ...dependenciesMap,
    ...COMPILER_DEPENDENCIES[compilerName].reduce(
      (dependencies: DependenciesCompiler, dependencyName: string): DependenciesCompiler => ({
        ...dependencies,
        [dependencyName]: compilerName,
      }),
      {},
    ),
  }),
  {},
);
