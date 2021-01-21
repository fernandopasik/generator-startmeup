import type { Config, ConfigValue } from './store';

const compareSortingValues = (
  value1: Record<string, unknown> | boolean | number | string | null | undefined,
  value2: Record<string, unknown> | boolean | number | string | null | undefined,
  sortFirst?: string[],
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
    (typeof value1 === 'string' && Boolean(sortFirst?.includes(value1))) ||
    (typeof value2 === 'object' && typeof value1 !== 'object')
  ) {
    return SORT_PREV;
  }

  if (
    (typeof value2 === 'string' && Boolean(sortFirst?.includes(value2))) ||
    (typeof value1 === 'object' && typeof value2 !== 'object')
  ) {
    return SORT_NEXT;
  }

  return compare1.localeCompare(compare2);
};

const sortProps = (json?: Config, sortFirst?: string[]): Config =>
  Object.fromEntries(
    Object.entries(json ?? {})
      .sort(([key1]: readonly [string, ConfigValue], [key2]: readonly [string, ConfigValue]) =>
        compareSortingValues(key1, key2, sortFirst),
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
                typeof element === 'object' ? sortProps(element, sortFirst) : element,
              )
              .sort((value1: ConfigValue, value2: ConfigValue) =>
                compareSortingValues(value1, value2, sortFirst),
              ),
          ];
        }

        if (typeof value === 'object') {
          return [key, sortProps(value, sortFirst)];
        }

        return [key, value];
      }),
  );

export default sortProps;
