import prettier from 'prettier';
import loadPrettierConfig from './load-prettier-config';
import sortProps from './sort-props';
import { Config } from './store';

const format = async (json: Readonly<Config>, type: 'json' | 'js' = 'json'): Promise<string> => {
  const prettierConfig = await loadPrettierConfig();

  const sortedJson = sortProps(json);
  const SPACED = 2;
  const NON_SPACED = 0;
  const SINGLE_LINE = 1;
  const SPACES = Object.keys(sortedJson).length > SINGLE_LINE ? NON_SPACED : SPACED;
  const stringifiedJson = JSON.stringify(sortedJson, null, SPACES);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const parser = type === 'js' ? 'babel' : 'json';
  return prettier.format(content, { ...prettierConfig, parser });
};

export default format;
