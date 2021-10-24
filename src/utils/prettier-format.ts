import prettier from 'prettier';
import prettierPluginPkg from 'prettier-plugin-pkg';
import prettierPluginSh from 'prettier-plugin-sh';

let config: prettier.Options | null = null;

const prettierFormat = async (content: string, filepath: string, root: string): Promise<string> => {
  if (config === null) {
    config = await prettier.resolveConfig(root);
  }

  return prettier.format(content, {
    ...config,
    filepath,
    plugins: [prettierPluginPkg, prettierPluginSh],
  });
};

export default prettierFormat;
