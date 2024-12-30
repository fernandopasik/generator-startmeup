import type { JsonObject } from 'type-fest';
import prettierFormat from './prettier-format.ts';
import sortProps from './sort-props.ts';

const formatJson = async (content: string, filepath: string, root: string): Promise<string> => {
  const JSON_SPACING = 2;
  let spaces = 0;

  const sortFirst = ['extends', 'files', 'plugins', 'error'];
  const jsonConfig = sortProps(JSON.parse(content) as JsonObject, sortFirst);

  if (Object.keys(jsonConfig).length <= JSON_SPACING) {
    spaces = JSON_SPACING;
  }

  return prettierFormat(JSON.stringify(jsonConfig, null, spaces), filepath, root);
};

export default formatJson;
