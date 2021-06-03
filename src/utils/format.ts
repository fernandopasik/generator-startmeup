import prettier from 'prettier';
import * as prettierPluginPackageJson from 'prettier-plugin-packagejson';

export const hasExtension = (filename: string, extension: string): boolean =>
  new RegExp(`.${extension}$`).test(filename);

let config: prettier.Options | null = null;

export const prettierFormat = async (
  content: string,
  filepath: string,
  root: string,
): Promise<string> => {
  if (config === null) {
    config = await prettier.resolveConfig(root);
  }

  return prettier.format(content, {
    ...config,
    filepath,
    plugins: [prettierPluginPackageJson],
  });
};

export const removeTemplateComments = (content = ''): string =>
  content.replace(/\/\/\//g, '').replace(/[^\S\r\n]*\/\/[^\S\r\n\w]*\n/g, '');
