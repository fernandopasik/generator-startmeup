/* eslint-disable  @typescript-eslint/naming-convention, id-length, sort-keys */
import sortProps from './sort-props.ts';

describe('sort props', () => {
  it('undefined config', () => {
    expect(sortProps()).toStrictEqual({});
  });

  it('empty config', () => {
    expect(sortProps({})).toStrictEqual({});
  });

  it('primitive values', () => {
    const config = {
      b: null,
      a: 1,
      c: '',
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: 1,
        b: null,
        c: '',
      }),
    );
  });

  it('array value', () => {
    const config = {
      b: null,
      a: ['c', 'b', 'a'],
      c: '',
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: ['a', 'b', 'c'],
        b: null,
        c: '',
      }),
    );
  });

  it('object values', () => {
    const config = {
      b: null,
      a: {
        f: 4,
        g: null,
        d: '',
      },
      c: '',
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: {
          d: '',
          f: 4,
          g: null,
        },
        b: null,
        c: '',
      }),
    );
  });

  it('larger object values', () => {
    const config = {
      b: null,
      a: {
        f: 4,
        g: {
          i: '',
          h: 'a',
        },
        d: '',
      },
      c: '',
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: {
          d: '',
          f: 4,
          g: {
            h: 'a',
            i: '',
          },
        },
        b: null,
        c: '',
      }),
    );
  });

  it('lowercase and uppercase values', () => {
    const config = { B: null, a: 1, b: '' };
    const sortedConfig = { a: 1, B: null, b: '' };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(JSON.stringify(sortedConfig));
  });

  it('extends goes always first', () => {
    const config = {
      b: null,
      extends: '',
      a: 1,
    };

    expect(JSON.stringify(sortProps(config, ['extends']))).toStrictEqual(
      JSON.stringify({
        extends: '',
        a: 1,
        b: null,
      }),
    );
  });

  it('objects in arrays go after primitive values', () => {
    const config = {
      b: null,
      c: ['b', {}, 'a'],
      a: 1,
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: 1,
        b: null,
        c: ['a', 'b', {}],
      }),
    );
  });

  it('objects are sorted in arrays', () => {
    const config = {
      b: null,
      c: [
        'b',
        {
          c: '1',
          f: '2',
          e: '3',
        },
        'a',
      ],
      a: 1,
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: 1,
        b: null,
        c: [
          'a',
          'b',
          {
            c: '1',
            e: '3',
            f: '2',
          },
        ],
      }),
    );
  });

  it('array of objects sorted by stringifying them', () => {
    const config = {
      c: [
        { a: 5, b: 2 },
        { b: 2, a: 1 },
        { a: 1, b: 3 },
      ],
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        c: [
          { a: 1, b: 2 },
          { a: 1, b: 3 },
          { a: 5, b: 2 },
        ],
      }),
    );
  });
});
