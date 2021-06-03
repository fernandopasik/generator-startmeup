import cleanupTemplate from './cleanup-template';
import formatJson from './format-json';
import hasExtension from './has-extension';
import prettierFormat from './prettier-format';

const format = async (content: string, filepath: string, root: string): Promise<string> => {
  const sanitized = cleanupTemplate(content);

  let formatted = await prettierFormat(sanitized, filepath, root);

  if (hasExtension(filepath, 'json')) {
    formatted = await formatJson(formatted, filepath, root);
  }

  return formatted;
};

export default format;
