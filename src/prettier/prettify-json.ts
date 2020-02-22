import prettier, { Options } from 'prettier';

export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;

interface JsonMap {
  [key: string]: AnyJson;
}

const prettifyJson = (json: AnyJson, config: Options): string =>
type JsonArray = Array<AnyJson>;

  prettier.format(JSON.stringify(json, null, 2), { ...config, parser: 'json' });

export default prettifyJson;
