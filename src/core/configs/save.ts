import fs from 'fs';

import currentPath from './current-path';
import format from './format';
import sortProps from './sort-props';
import store, { Config } from './store';

const save = async (
  filename: string,
  json: Readonly<Config>,
  type: 'json' | 'js' = 'json',
): Promise<void> => {
  const sortedJson = sortProps(json);
  const SPACED = 2;
  const NON_SPACED = 0;
  const SINGLE_LINE = 1;
  const SPACES = Object.keys(sortedJson).length > SINGLE_LINE ? NON_SPACED : SPACED;
  const stringifiedJson = JSON.stringify(sortedJson, null, SPACES);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const formattedContent = await format(content, type);

  store.set(filename, json);
  fs.writeFileSync(currentPath(filename), formattedContent);
};

export default save;
