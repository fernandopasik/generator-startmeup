import prettier from 'prettier';
import * as prettierPluginPackageJson from 'prettier-plugin-packagejson';

let config: prettier.Options | null = null;

const prettierFormat = async (content: string, filepath: string, root: string): Promise<string> => {
  if (config === null) {
    config = await prettier.resolveConfig(root);
  }

  return prettier.format(content, {
    ...config,
    filepath,
    plugins: [prettierPluginPackageJson],
  });
};

export default prettierFormat;
