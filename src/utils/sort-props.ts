import { type JsonObject, type JsonValue } from 'type-fest';

const compareSortingValues = (
  value1: JsonValue,
  value2: JsonValue,
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

const sortProps = (json?: JsonObject, sortFirst?: string[]): JsonObject =>
  Object.fromEntries(
    Object.entries(json ?? {})
      .sort(([key1]: [string, JsonValue | undefined], [key2]: [string, JsonValue | undefined]) =>
        compareSortingValues(key1, key2, sortFirst),
      )
      .map(([key, value]: [string, JsonValue | undefined]) => {
        if (value === null) {
          return [key, value];
        }

        if (Array.isArray(value)) {
          return [
            key,
            value
              .map((element: JsonValue) =>
                typeof element === 'object' ? sortProps(element as JsonObject, sortFirst) : element,
              )
              .sort((value1: JsonValue, value2: JsonValue) =>
                compareSortingValues(value1, value2, sortFirst),
              ),
          ];
        }

        if (typeof value === 'object') {
          return [key, sortProps(value as JsonObject, sortFirst)];
        }

        return [key, value];
      }),
  ) as JsonObject;

export default sortProps;
