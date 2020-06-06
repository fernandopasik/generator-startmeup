import { Config, ConfigValue } from './store';

const compareSortingValues = (
  value1: string | number | null | boolean | Record<string, unknown> | undefined,
  value2: string | number | null | boolean | Record<string, unknown> | undefined,
): number => {
  const SORT_PREV = -1;
  const SORT_NEXT = 1;
  const compare1 =
    typeof value1 === 'object'
      ? JSON.stringify(value1).toLowerCase()
      : String(value1).toLowerCase();
  const compare2 =
    typeof value2 === 'object'
      ? JSON.stringify(value2).toLowerCase()
      : String(value2).toLowerCase();

  if (
    value1 === 'extends' ||
    value1 === 'files' ||
    (typeof value2 === 'object' && typeof value1 !== 'object')
  ) {
    return SORT_PREV;
  }

  if (
    value2 === 'extends' ||
    value2 === 'files' ||
    (typeof value1 === 'object' && typeof value2 !== 'object')
  ) {
    return SORT_NEXT;
  }

  return compare1.localeCompare(compare2);
};

const sortProps = (json?: Config): Config =>
  Object.fromEntries(
    Object.entries(json ?? {})
      .sort(([key1]: readonly [string, ConfigValue], [key2]: readonly [string, ConfigValue]) =>
        compareSortingValues(key1, key2),
      )
      .map(([key, value]: readonly [string, ConfigValue]) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (value === null) {
          return [key, value];
        }

        if (Array.isArray(value)) {
          return [
            key,
            value
              .map((element: Readonly<Config>) =>
                typeof element === 'object' ? sortProps(element) : element,
              )
              .sort(compareSortingValues),
          ];
        }

        if (typeof value === 'object') {
          return [key, sortProps(value)];
        }

        return [key, value];
      }),
  );

export default sortProps;
