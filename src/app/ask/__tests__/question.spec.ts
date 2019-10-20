import { Question, flatten, getNames, setDefaultValue, setDefaultValues } from '../question';

describe('Question', () => {
  describe('getNames', () => {
    it('from empty', () => {
      expect(getNames([])).toStrictEqual([]);
    });

    it('from questions', () => {
      const questions: Question[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const names = getNames(questions);

      expect(names).toStrictEqual(['question1', 'question2', 'question3']);
    });
  });

  describe('setDefaultValue', () => {
    it('receives a question and default value and sets on it', () => {
      const question: Question & { name: string } = {
        name: 'question1',
        default: 'originalDefault',
        type: 'input',
      };
      const defaultValue = 'newdefault';

      const newQuestion = setDefaultValue(question, defaultValue);

      expect(newQuestion).toHaveProperty('default', defaultValue);
    });

    it('receives a question and keeps its existing default value', () => {
      const question: Question & { name: string } = {
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
    it('handles empty group of questions', () => {
      expect(setDefaultValues()).toStrictEqual([]);
      expect(setDefaultValues([])).toStrictEqual([]);
    });

    it('receives a group of questions and defaults and sets them', () => {
      const questions: Question[] = [
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

    it('receives a group of questions and some defaults and sets only some', () => {
      const questions: Question[] = [
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

    it('receives a group of questions and no defaults and keeps originals', () => {
      const questions: Question[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const newQuestions = setDefaultValues(questions);

      expect(newQuestions).toStrictEqual(questions);
    });
  });

  describe('flatten', () => {
    it('handles empty questions', () => {
      expect(flatten()).toStrictEqual([]);
      expect(flatten([])).toStrictEqual([]);
    });

    it('keeps originals if no nested questions', () => {
      const questions: Question[] = [
        { name: 'question1', default: 'default1', type: 'input' },
        { name: 'question2', default: 'default2', type: 'input' },
        { name: 'question3', default: 'default3', type: 'input' },
      ];

      const flattened = flatten(questions);

      expect(flattened).toStrictEqual(questions);
    });

    it('flattens nested questions', () => {
      const questions: Question[] = [
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

    it('flattens nested questions with name composed with parent', () => {
      const questions: Question[] = [
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

    it('flattens nested questions with name composed with parent with more than 2 levels', () => {
      const questions: Question[] = [
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
