import path from 'path';
import fs from 'fs';
import prettier, { Options } from 'prettier';

type Config = Record<string, any>;
type ConfigFormat = 'json' | 'js';

const cache = new Map();

export const currentPath = (filename: string = ''): string => path.join(process.cwd(), filename);

export const fileExists = (filename: string): boolean => fs.existsSync(currentPath(filename));

export const load = async (filename: string, initial?: Config): Promise<Config | undefined> => {
  if (cache.has(filename)) {
    return cache.get(filename);
  }

  try {
    const { default: config } = await import(currentPath(filename));
    cache.set('filename', config);
    return config;
  } catch (error) {
    if (typeof initial === 'undefined') {
      return undefined;
    }

    cache.set('filename', initial);
    return initial;
  }
};

export const loadPrettierConfig = ((): (() => Promise<Options>) => {
  let prettierConfig: Options | undefined;

  const defaultPrettierConfig = {
    arrowParens: 'always',
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
  };

  return async (): Promise<Options> => {
    if (typeof prettierConfig === 'undefined') {
      prettierConfig =
        (await prettier.resolveConfig(process.cwd())) ?? (defaultPrettierConfig as Options);
    }

    return prettierConfig;
  };
})();

export const format = async (content: string, type: ConfigFormat = 'json'): Promise<string> => {
  const prettierConfig = await loadPrettierConfig();

  const parser = type === 'js' ? 'babel' : 'json';
  return prettier.format(content, { ...prettierConfig, parser });
};

export const save = async (
  filename: string,
  json: Config,
  type: ConfigFormat = 'json',
): Promise<void> => {
  const stringifiedJson = JSON.stringify(json, null, 2);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const formattedContent = await format(content, type);

  fs.writeFileSync(currentPath(filename), formattedContent);
};
