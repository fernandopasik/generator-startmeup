// eslint-disable-next-line import/no-extraneous-dependencies
import {
  CompilerOptions,
  JsxEmit,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
} from 'typescript';
import { dependencies } from '../core';

interface TypescriptConfig {
  extends?: string;
  compilerOptions?: CompilerOptions;
  include: string[];
  exclude: string[];
}

const getExclude = (): string[] => {
  const exclude: string[] = [];

  if (dependencies.has('jest', 'devDependencies')) {
    exclude.push('**/__tests__/**', '**/__mocks__/**', '**/*.spec.*');
  }

  if (dependencies.has('jest-puppeteer', 'devDependencies')) {
    exclude.push('**/*.e2e.*');
  }

  if (
    dependencies.has('@storybook/react', 'devDependencies') ||
    dependencies.has('@storybook/web-components', 'devDependencies')
  ) {
    exclude.push('**/__stories__/**', '**/*.stories.*');
  }

  if (dependencies.has('flow-bin', 'devDependencies')) {
    exclude.push('**/*.flow');
  }

  return exclude.sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()));
};

const getTSConfig = (): TypescriptConfig => ({
  compilerOptions: {
    declaration: true,
    declarationMap: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    inlineSources: true,
    ...(dependencies.has('react') ? { jsx: ('react' as unknown) as JsxEmit } : {}),
    lib: ['es2020', 'dom', 'dom.iterable'],
    module: ('ESNext' as unknown) as ModuleKind,
    moduleResolution: ('node' as unknown) as ModuleResolutionKind,
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
    target: ('es2017' as unknown) as ScriptTarget,
  },
  include: ['src/**/*'],
  exclude: getExclude(),
});

export const getTSConfigAll = (): TypescriptConfig => {
  const include = ['src/**/*', './*.js'];
  const exclude = [];

  if (dependencies.has('jest-enzyme', 'devDependencies')) {
    include.push('node_modules/jest-enzyme/lib/index.d.ts');
  }

  if (dependencies.has('flow-bin', 'devDependencies')) {
    exclude.push('**/*.flow');
  }

  return {
    extends: './tsconfig.json',
    compilerOptions: {
      allowJs: true,
      noEmit: true,
      outDir: '$$ts-jest',
    },
    include,
    exclude,
  };
};

export default getTSConfig;
