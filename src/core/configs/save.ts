import fs from 'fs';

import currentPath from './current-path';
import format from './format';
import store, { Config } from './store';

const save = async (filename: string, json: Readonly<Config>): Promise<void> => {
  const type = /^.*\.(js|cjs)$/.exec(filename) !== null ? 'js' : 'json';
  const formattedContent = await format(json, type);

  store.set(filename, json);
  fs.writeFileSync(currentPath(filename), formattedContent);
};

export default save;
