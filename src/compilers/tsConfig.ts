import { dependencies } from '../core';

const getTSConfig = (): any => ({
  compilerOptions: {
    declaration: true,
    declarationMap: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    inlineSources: true,
    ...(dependencies.has('react') ? { jsx: 'react' } : {}),
    lib: ['es2020', 'dom', 'dom.iterable'],
    module: 'ESNext',
    moduleResolution: 'node',
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    outDir: '.',
    rootDirs: ['src'],
    sourceMap: true,
    strict: true,
    strictBindCallApply: true,
    strictFunctionTypes: true,
    strictNullChecks: true,
    strictPropertyInitialization: true,
    target: 'es2017',
  },
  include: ['src/**/*'],
  exclude: [
    'node_modules',
    '**/__tests__/**/*',
    `**/?(*.)+(spec|test).${dependencies.has('typescript', 'devDependencies') ? '(js|ts)' : 'js'}${
      dependencies.has('react') ? '?(x)' : ''
    }`,
  ],
});

export default getTSConfig;
