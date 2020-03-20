import sortProps from '../sort-props';

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
    const config = {
      B: null,
      a: 1,
      C: '',
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        a: 1,
        B: null,
        C: '',
      }),
    );
  });

  it('extends goes always first', () => {
    const config = {
      b: null,
      extends: '',
      a: 1,
    };

    expect(JSON.stringify(sortProps(config))).toStrictEqual(
      JSON.stringify({
        extends: '',
        a: 1,
        b: null,
      }),
    );
  });

  it('objects in arrays', () => {
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
});
