import { format, resolveConfig } from 'prettier';
import prettierPluginPkg from 'prettier-plugin-pkg';
import prettierPluginSh from 'prettier-plugin-sh';

const prettierFormat = async (content: string, filepath: string, root: string): Promise<string> => {
  const config = await resolveConfig(root);

  return format(content, {
    ...config,
    filepath,
    plugins: [prettierPluginPkg, prettierPluginSh],
  });
};

export default prettierFormat;
