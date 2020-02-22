import prettier, { Options } from 'prettier';

export interface AnyJson {
  [key: string]: number | string | boolean | AnyJson | null;
}

const prettifyJson = (json: AnyJson, config: Options): string =>
  prettier.format(JSON.stringify(json, null, 2), { ...config, parser: 'json' });

export default prettifyJson;
