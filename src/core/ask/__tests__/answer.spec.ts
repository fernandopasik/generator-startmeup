import {
  areUnanswered,
  flatten,
  forget,
  forgetAll,
  get,
  getAll,
  has,
  remember,
  rememberAll,
} from '../answer';

describe('answer', () => {
  describe('remember', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('saves in memory an answer', () => {
      const answer = 'this is an example';
      remember('example', answer);

      expect(get('example')).toBe(answer);
    });

    it('replaces existing stored answer', () => {
      const answer = 'this is an example';
      const anotherAnswer = 'this is another example';
      remember('example', answer);
      remember('example', anotherAnswer);

      expect(get('example')).toBe(anotherAnswer);
    });
  });

  describe('rememberAll', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('saves in memory a group of answers', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
        answer3: 'value3',
      };
      rememberAll(answers);

      expect(getAll()).toStrictEqual(answers);
    });

    it('saves in existing memory a group of answers', () => {
      const answers1 = {
        answer1: 'value1',
        answer2: 'value2',
      };
      const answers2 = {
        answer2: 'value2',
        answer3: 'value3',
      };
      rememberAll(answers1);
      rememberAll(answers2);

      expect(getAll()).toStrictEqual({
        ...answers1,
        ...answers2,
      });
    });

    it('handles empty group of answers', () => {
      rememberAll({});

      expect(getAll()).toStrictEqual({});
    });
  });

  describe('get', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('can get an answer', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(get('answer1')).toBe('value1');
    });

    it('can get a group of answers', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
        answer3: 'value3',
      };
      rememberAll(answers);

      expect(get(['answer1', 'answer2'])).toStrictEqual({ answer1: 'value1', answer2: 'value2' });
    });

    it('can handle non existent answer', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(get('answer3')).toBeUndefined();
    });
  });

  describe('getAll', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('can get all answers', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(getAll()).toStrictEqual(answers);
    });

    it('can get a group of answers', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
        answer3: 'value3',
      };
      rememberAll(answers);

      expect(getAll(['answer1', 'answer2'])).toStrictEqual({
        answer1: 'value1',
        answer2: 'value2',
      });
    });

    it('can get a group of some known answers', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
        answer3: 'value3',
      };
      rememberAll(answers);

      expect(getAll(['answer1', 'answer2', 'answer4'])).toStrictEqual({
        answer1: 'value1',
        answer2: 'value2',
      });
    });
  });

  describe('has', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('with existing answer', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(has('answer1')).toBe(true);
    });

    it('with non existing answer', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(has('answer3')).toBe(false);
    });
  });

  describe('forget', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('an existing answer', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      forget('answer1');

      expect(get('answer1')).toBeUndefined();
      expect(getAll()).toStrictEqual({ answer2: 'value2' });
    });

    it('an non existing answer', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      forget('answer3');

      expect(getAll()).toStrictEqual(answers);
    });

    it('when no answers are remembered', () => {
      forget('answer3');

      expect(getAll()).toStrictEqual({});
    });
  });

  describe('forgetAll', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('when existing answers', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      forgetAll();

      expect(getAll()).toStrictEqual({});
    });

    it('when non existing answers', () => {
      forgetAll();

      expect(getAll()).toStrictEqual({});
    });
  });

  describe('areUnanswered', () => {
    beforeEach(() => {
      forgetAll();
    });

    it('when some are', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(areUnanswered(['answer2', 'answer3', 'answer4'])).toStrictEqual([
        'answer3',
        'answer4',
      ]);
    });

    it('when all are', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(areUnanswered(['answer3', 'answer4'])).toStrictEqual(['answer3', 'answer4']);
    });

    it('when none are', () => {
      const answers = {
        answer1: 'value1',
        answer2: 'value2',
      };
      rememberAll(answers);

      expect(areUnanswered(['answer1', 'answer2'])).toStrictEqual([]);
    });
  });

  describe('flatten', () => {
    it('handles empty answers', () => {
      expect({}).toStrictEqual({});
    });

    it('returns same answers when no nested', () => {
      const answers = {
        a: 'valueA',
        b: 'valueB',
      };

      const flattened = flatten(answers);

      expect(flattened).toStrictEqual(answers);
    });

    it('split nested answers', () => {
      const answers = {
        a: 'valueA',
        b: {
          c: 'valueC',
          d: 'valueD',
        },
        e: 'valueE',
      };

      const flattened = flatten(answers);

      expect(Object.keys(flattened)).toHaveLength(4);
    });

    it('split nested answers with composed names', () => {
      const answers = {
        a: 'valueA',
        b: {
          c: 'valueC',
          d: 'valueD',
        },
        e: 'valueE',
      };

      const flattened = flatten(answers);

      expect(flattened).toStrictEqual({
        a: 'valueA',
        'b.c': 'valueC',
        'b.d': 'valueD',
        e: 'valueE',
      });
    });

    it('split nested answers with more than 2 levels', () => {
      const answers = {
        a: 'valueA',
        b: {
          c: {
            d: 'valueD',
          },
          e: 'valueE',
        },
      };

      const flattened = flatten(answers);

      expect(flattened).toStrictEqual({
        a: 'valueA',
        'b.c.d': 'valueD',
        'b.e': 'valueE',
      });
    });
  });
});
