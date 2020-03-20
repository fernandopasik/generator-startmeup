import { Config, ConfigValue } from './store';

const compareSortingValues = (
  value1: string | number | null | boolean | undefined,
  value2: string | number | null | boolean | undefined,
): number =>
  String(value1)
    .toLowerCase()
    .localeCompare(String(value2).toLowerCase());

const sortProps = (json?: Config): Config =>
  Object.fromEntries(
    Object.entries(json ?? {})
      .sort(([key1]: readonly [string, ConfigValue], [key2]: readonly [string, ConfigValue]) =>
        compareSortingValues(key1, key2),
      )
      .map(([key, value]: readonly [string, ConfigValue]) => {
        if (value === null) {
          return [key, value];
        }

        if (Array.isArray(value)) {
          return [key, value.sort(compareSortingValues)];
        }

        if (typeof value === 'object') {
          return [key, sortProps(value)];
        }

        return [key, value];
      }),
  );

export default sortProps;
