import prettier from 'prettier';
import loadPrettierConfig from './load-prettier-config';

const format = async (content: string, type: 'json' | 'js' = 'json'): Promise<string> => {
  const prettierConfig = await loadPrettierConfig();

  const parser = type === 'js' ? 'babel' : 'json';
  return prettier.format(content, { ...prettierConfig, parser });
};

export default format;
