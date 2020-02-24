import { has, hasDev } from '../app/dependencies/index';

const getTSConfig = (): any => ({
  compilerOptions: {
    declaration: true,
    declarationMap: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    inlineSources: true,
    ...(has('react') ? { jsx: 'react' } : {}),
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
    `**/?(*.)+(spec|test).${hasDev('typescript') ? '(js|ts)' : 'js'}${has('react') ? '?(x)' : ''}`,
  ],
});

export default getTSConfig;
