import { resolveConfig, Options } from 'prettier';
import currentDir from './current-dir';

let prettierConfig: Options | undefined;

const defaultPrettierConfig = {
  arrowParens: 'always',
  printWidth: 100,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};

export const clearPrettierConfig = (): void => {
  prettierConfig = undefined;
};

const loadPrettierConfig = async (): Promise<Options> => {
  if (typeof prettierConfig === 'undefined') {
    prettierConfig = (await resolveConfig(currentDir())) ?? (defaultPrettierConfig as Options);
  }

  return prettierConfig;
};

export default loadPrettierConfig;
