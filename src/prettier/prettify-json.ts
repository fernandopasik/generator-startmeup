import prettier, { Options } from 'prettier';

export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;

interface JsonMap {
  [key: string]: AnyJson;
}

type JsonArray = AnyJson[];

const prettifyJson = (json: AnyJson, config: Options = {}): string =>
  prettier.format(JSON.stringify(json, null, 2), { ...config, parser: 'json' });

export default prettifyJson;
