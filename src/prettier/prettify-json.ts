import prettier, { Options } from 'prettier';

const JSON_SPACES = 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prettifyJson = (json: Record<string, any>, config: Options = {}): string =>
  prettier.format(JSON.stringify(json, null, JSON_SPACES), { ...config, parser: 'json' });

export default prettifyJson;
