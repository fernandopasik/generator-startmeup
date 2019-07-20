import { AskQuestion, flatten, getNames, setDefaultValue, setDefaultValues } from '../question';

describe('Question', () => {
  describe('getNames', () => {
    test('from empty', () => {
      expect(getNames([])).toStrictEqual([]);
    });

    test('from questions', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const names = getNames(questions);

      expect(names).toStrictEqual(['question1', 'question2', 'question3']);
    });
  });

  describe('setDefaultValue', () => {
    test('receives a question and default value and sets on it', () => {
      const question: AskQuestion & { name: string } = {
        name: 'question1',
        default: 'originalDefault',
        type: 'input',
      };
      const defaultValue = 'newdefault';

      const newQuestion = setDefaultValue(question, defaultValue);

      expect(newQuestion).toHaveProperty('default', defaultValue);
    });

    test('receives a question and keeps its existing default value', () => {
      const question: AskQuestion & { name: string } = {
        name: 'question1',
        default: 'originalDefault',
        type: 'input',
      };

      const newQuestion = setDefaultValue(question);

      expect(newQuestion).toHaveProperty('default', question.default);
      expect(newQuestion).toStrictEqual(question);
    });
  });

  describe('setDefaultValues', () => {
    test('receives a group of questions and defaults and sets them', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const defaults = {
        question1: 'newdefault1',
        question2: 'newdefault2',
        question3: 'newdefault3',
      };

      const newQuestions = setDefaultValues(questions, defaults);

      expect(newQuestions).toStrictEqual([
        { name: 'question1', default: 'newdefault1', type: 'input' },
        { name: 'question2', default: 'newdefault2', type: 'input' },
        { name: 'question3', default: 'newdefault3', type: 'input' },
      ]);
    });

    test('receives a group of questions and some defaults and sets only some', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const defaults = {
        question1: 'newdefault1',
        question3: 'newdefault3',
      };

      const newQuestions = setDefaultValues(questions, defaults);

      expect(newQuestions).toStrictEqual([
        { name: 'question1', default: 'newdefault1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'newdefault3', type: 'input' },
      ]);
    });

    test('receives a group of questions and no defaults and keeps originals', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const newQuestions = setDefaultValues(questions);

      expect(newQuestions).toStrictEqual(questions);
    });
  });

  describe('flatten', () => {
    test('handles empty questions', () => {
      expect([]).toStrictEqual([]);
    });

    test('keeps originals if no nested questions', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const flattened = flatten(questions);

      expect(flattened).toStrictEqual(questions);
    });

    test('flattens nested questions', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        {
          name: 'question2',
          questions: [
            { name: 'a', default: 'defaulta', type: 'input' },
            { name: 'b', default: 'defaultb', type: 'input' },
          ],
        },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const flattened = flatten(questions);

      expect(flattened).toHaveLength(4);
    });

    test('flattens nested questions with name composed with parent', () => {
      const questions: AskQuestion[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        {
          name: 'question2',
          questions: [
            { name: 'a', default: 'defaulta', type: 'input' },
            { name: 'b', default: 'defaultb', type: 'input' },
          ],
        },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const flattened = flatten(questions);

      expect(flattened).toStrictEqual([
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2.a', default: 'defaulta', type: 'input' },
        { name: 'question2.b', default: 'defaultb', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ]);
    });

    test('flattens nested questions with name composed with parent with more than 2 levels', () => {
      const questions: AskQuestion[] = [
        {
          name: 'question1',
          questions: [
            {
              name: 'a',
              questions: [
                { name: 'b', questions: [{ name: 'c', default: 'defaultc', type: 'input' }] },
              ],
            },
            { name: 'b', default: 'defaultb', type: 'input' },
          ],
        },

        { name: 'question2', default: 'default2', type: 'input' },
      ];

      const flattened = flatten(questions);

      expect(flattened).toStrictEqual([
        { name: 'question1.a.b.c', default: 'defaultc', type: 'input' },
        { name: 'question1.b', default: 'defaultb', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
      ]);
    });
  });
});
