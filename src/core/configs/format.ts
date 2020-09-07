import type { BuiltInParserName } from 'prettier';
import prettier from 'prettier';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as prettierPluginPackageJson from 'prettier-plugin-packagejson';
import load from './load';
import loadPrettierConfig from './load-prettier-config';
import type { Config } from './store';

export const stringifyJson = (json: Readonly<Config>): string => {
  const SPACED = 2;
  const NON_SPACED = 0;
  const SINGLE_LINE = 1;
  const SPACES = Object.keys(json).length > SINGLE_LINE ? NON_SPACED : SPACED;
  return JSON.stringify(json, null, SPACES);
};

const format = async (json: Readonly<Config>, type: 'json' | 'js' = 'json'): Promise<string> => {
  const prettierConfig = await loadPrettierConfig();
  const pkg = await load('package.json');

  const stringifiedJson = stringifyJson(json);
  const moduleExport = pkg?.type === 'module' ? 'export default' : 'module.exports =';
  const content = type === 'js' ? `${moduleExport} ${stringifiedJson}` : stringifiedJson;

  let parser: BuiltInParserName = 'json';

  if (type === 'js') {
    parser = 'babel';
  }

  if ('main' in json && 'version' in json) {
    parser = 'json-stringify';
  }

  return prettier.format(content, {
    ...prettierConfig,
    parser,
    plugins: [prettierPluginPackageJson],
  });
};

export default format;
