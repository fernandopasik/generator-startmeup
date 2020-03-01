type Primitives = number | string | boolean;

interface NestedObject {
  [property: string]: Primitives | NestedObject;
}

interface NonNestedObject {
  [property: string]: Primitives;
}

export function flatObject(obj?: NestedObject, path?: string): NonNestedObject | undefined {
  if (typeof obj === 'undefined') {
    return obj;
  }

  return Object.keys(obj).reduce((previous: NonNestedObject, key: string): NonNestedObject => {
    const currentKey = typeof path !== 'undefined' ? `${path}.${key}` : key;
    const element = obj[key];

    if (typeof element !== 'object') {
      return {
        ...previous,
        [currentKey]: element,
      };
    }

    return {
      ...previous,
      ...flatObject(element, currentKey),
    };
  }, {});
}

export function unflatObject(obj?: NonNestedObject): NestedObject | undefined {
  if (typeof obj === 'undefined') {
    return obj;
  }

  return Object.keys(obj).reduce((previous: NestedObject, key: string): NestedObject => {
    const element = obj[key];
    const keys = key.split('.');

    if (keys.length > 0) {
      keys.reduce((acc: any, subkey: string, index: number): NestedObject => {
        if (index === keys.length - 1) {
          acc[subkey] = element;
        } else {
          acc[subkey] = acc[subkey] ?? {};
        }
        return acc[subkey];
      }, previous);

      return previous;
    }

    return {
      ...previous,
      [key]: element,
    };
  }, {});
}
