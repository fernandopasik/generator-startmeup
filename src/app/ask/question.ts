import 'core-js/features/array/flat-map';
import { Answers, Question } from 'inquirer';

export type AskSubQuestion = Question & {
  name: string;
};

export type AskQuestion = Question & {
  name: string;
  questions?: AskQuestion[];
};

export const getNames = (questions: AskQuestion[]): string[] =>
  questions.map((question: AskQuestion): string => question.name);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDefaultValue = (question: AskQuestion, defaultValue?: any): AskQuestion => ({
  ...question,
  default: defaultValue || question.default,
});

export const setDefaultValues = (
  questions: AskQuestion[] = [],
  defaultValues?: Answers,
): AskQuestion[] =>
  questions.map(
    (question: AskQuestion): AskQuestion =>
      setDefaultValue(question, defaultValues && defaultValues[question.name]),
  );

export const flatten = (questions: AskQuestion[] = []): AskSubQuestion[] =>
  questions.flatMap((question: AskQuestion): AskQuestion[] => {
    if (question.questions) {
      return flatten(question.questions).map(
        (subquestion: AskSubQuestion): AskSubQuestion => ({
          ...subquestion,
          name: `${question.name}.${subquestion.name}`,
        }),
      );
    }
    return [question];
  });