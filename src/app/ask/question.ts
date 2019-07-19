import 'core-js/features/array/flat-map';
import { Answers, Question } from 'inquirer';

type AskSubQuestion = Question & {
  name: string;
};

export type AskQuestion = Question & {
  name: string;
  questions?: AskQuestion[];
};

export const setDefaultValue = (question: AskQuestion, defaultValue?: any): AskQuestion => ({
  ...question,
  default: defaultValue || question.default,
});

export const setDefaultValues = (
  questions: AskQuestion[] = [],
  defaultValues?: Answers,
): AskQuestion[] =>
  questions.map((question: AskQuestion) =>
    setDefaultValue(question, defaultValues && defaultValues[question.name]),
  );

export const flatten = (questions: AskQuestion[] = []): AskSubQuestion[] =>
  questions.flatMap((question: AskQuestion) => {
    if (question.questions) {
      return flatten(question.questions).map(subquestion => ({
        ...subquestion,
        name: `${question.name}.${subquestion.name}`,
      }));
    }
    return [question];
  });
