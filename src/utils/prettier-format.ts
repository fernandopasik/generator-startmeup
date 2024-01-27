import path from 'node:path';
import { format, resolveConfig, resolveConfigFile } from 'prettier';

const prettierFormat = async (content: string, filepath: string, root: string): Promise<string> => {
  const configFile = await resolveConfigFile(path.join(root, filepath));
  const config = configFile ? (await resolveConfig(configFile)) ?? {} : {};

  if (filepath.includes('tsconfig.')) {
    config.parser = 'json';
  }

  return format(content, { ...config, filepath });
};

export default prettierFormat;
