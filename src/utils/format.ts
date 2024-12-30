import cleanupTemplate from './cleanup-template.ts';
import formatJson from './format-json.ts';
import hasExtension from './has-extension.ts';
import prettierFormat from './prettier-format.ts';

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
