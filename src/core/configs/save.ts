import fs from 'fs';

import currentPath from './current-path';
import format from './format';
import sortProps from './sort-props';
import { Config } from './store';

const save = async (
  filename: string,
  json: Config,
  type: 'json' | 'js' = 'json',
): Promise<void> => {
  const sortedJson = sortProps(json);
  const SPACES = Object.keys(sortedJson).length > 1 ? 0 : 2;
  const stringifiedJson = JSON.stringify(sortedJson, null, SPACES);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const formattedContent = await format(content, type);

  fs.writeFileSync(currentPath(filename), formattedContent);
};

export default save;
