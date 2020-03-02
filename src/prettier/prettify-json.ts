import prettier, { Options } from 'prettier';

const prettifyJson = (json: Record<string, any>, config: Options = {}): string =>
  prettier.format(JSON.stringify(json, null, 2), { ...config, parser: 'json' });

export default prettifyJson;
