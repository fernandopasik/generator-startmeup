import prettier, { Options } from 'prettier';

let prettierConfig: Options | undefined;

const defaultPrettierConfig = {
  arrowParens: 'always',
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
};

const loadPrettierConfig = async (): Promise<Options> => {
  if (typeof prettierConfig === 'undefined') {
    prettierConfig =
      (await prettier.resolveConfig(process.cwd())) ?? (defaultPrettierConfig as Options);
  }

  return prettierConfig;
};

export default loadPrettierConfig;
