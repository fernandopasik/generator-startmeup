import prettier from 'prettier';
import loadPrettierConfig from './load-prettier-config';
import { Config } from './store';

export const stringifyJson = (json: Readonly<Config>): string => {
  const SPACED = 2;
  const NON_SPACED = 0;
  const SINGLE_LINE = 1;
  const SPACES = Object.keys(json).length > SINGLE_LINE ? NON_SPACED : SPACED;
  return JSON.stringify(json, null, SPACES);
};

const format = async (json: Readonly<Config>, type: 'json' | 'js' = 'json'): Promise<string> => {
  const prettierConfig = await loadPrettierConfig();

  const stringifiedJson = stringifyJson(json);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const parser = type === 'js' ? 'babel' : 'json';
  return prettier.format(content, { ...prettierConfig, parser });
};

export default format;
