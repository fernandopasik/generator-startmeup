import prettier, { Options } from 'prettier';

let prettierConfig: Options | undefined;

const defaultPrettierConfig = {
  arrowParens: 'always',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
};

const loadPrettierConfig = async (): Promise<Options> => {
  if (typeof prettierConfig === 'undefined') {
    prettierConfig =
      (await prettier.resolveConfig(process.cwd())) ?? (defaultPrettierConfig as Options);
  }

  prettierConfig.printWidth = 80;

  return prettierConfig;
};

export default loadPrettierConfig;
