import fs from 'fs';

import currentPath from './current-path';
import format from './format';
import { Config } from './load';

const save = async (
  filename: string,
  json: Config,
  type: 'json' | 'js' = 'json',
): Promise<void> => {
  const stringifiedJson = JSON.stringify(json);
  const content = type === 'js' ? `module.exports = ${stringifiedJson}` : stringifiedJson;

  const formattedContent = await format(content, type);

  fs.writeFileSync(currentPath(filename), formattedContent);
};

export default save;
