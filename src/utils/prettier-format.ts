import prettier from 'prettier';
import prettierPluginPkg from 'prettier-plugin-pkg';

let config: prettier.Options | null = null;

const prettierFormat = async (content: string, filepath: string, root: string): Promise<string> => {
  if (config === null) {
    config = await prettier.resolveConfig(root);
  }

  return prettier.format(content, {
    ...config,
    filepath,
    plugins: [prettierPluginPkg],
  });
};

export default prettierFormat;
