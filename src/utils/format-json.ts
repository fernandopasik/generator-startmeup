import type { JsonObject } from 'type-fest';
import prettierFormat from './prettier-format.js';
import sortProps from './sort-props.js';

const formatJson = async (content: string, filepath: string, root: string): Promise<string> => {
  const JSON_SPACING = 2;
  let spaces = 0;

  const jsonConfig = sortProps(JSON.parse(content) as JsonObject, ['extends', 'files', 'error']);

  if (Object.keys(jsonConfig).length <= JSON_SPACING) {
    spaces = JSON_SPACING;
  }

  return prettierFormat(JSON.stringify(jsonConfig, null, spaces), filepath, root);
};

export default formatJson;
