import fs from 'fs';

import currentPath from './current-path';
import format from './format';
import { Config } from './store';

const save = async (
  filename: string,
  json: Config,
  type: 'json' | 'js' = 'json',
): Promise<void> => {
  const SPACES = Object.keys(json).length > 1 ? 0 : 2;
  const stringifiedJson = JSON.stringify(json, null, SPACES);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const formattedContent = await format(content, type);

  fs.writeFileSync(currentPath(filename), formattedContent);
};

export default save;
