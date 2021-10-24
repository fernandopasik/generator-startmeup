import cleanupTemplate from './cleanup-template.js';
import formatJson from './format-json.js';
import hasExtension from './has-extension.js';
import prettierFormat from './prettier-format.js';

const format = async (content: string, filepath: string, root: string): Promise<string> => {
  const sanitized = cleanupTemplate(content);

  let formatted = '';

  try {
    formatted = await prettierFormat(sanitized, filepath, root);
  } catch {
    formatted = content;
  }

  if (hasExtension(filepath, 'json')) {
    formatted = await formatJson(formatted, filepath, root);
  }

  return formatted;
};

export default format;
