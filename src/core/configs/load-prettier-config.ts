import { resolveConfig, Options } from 'prettier';
import currentDir from './current-dir';

let prettierConfig: Options | null = null;

const defaultPrettierConfig = {
  arrowParens: 'always',
  printWidth: 100,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};

export const clearPrettierConfig = (): void => {
  prettierConfig = null;
};

const loadPrettierConfig = async (): Promise<Options> => {
  if (prettierConfig === null) {
    prettierConfig = (await resolveConfig(currentDir())) ?? (defaultPrettierConfig as Options);
  }

  return prettierConfig;
};

export default loadPrettierConfig;
