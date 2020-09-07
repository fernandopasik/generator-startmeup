import 'core-js/features/array/flat-map';
import type { Answers, Question as InquirerQuestion } from 'inquirer';

interface InquirerQuestions extends InquirerQuestion {
  choices?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type SubQuestion = InquirerQuestions & {
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Question = InquirerQuestions & {
  name: string;
  questions?: Question[];
};

export const getNames = (questions: readonly Readonly<Question>[]): string[] =>
  questions.map((question: Readonly<Question>): string => question.name);

export const setDefaultValue = (
  question: Readonly<Question>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any | any[],
): Question => ({
  ...question,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  default: defaultValue ?? question.default,
});

export const setDefaultValues = (
  questions: readonly Readonly<Question>[] = [],
  defaultValues?: Answers,
): Question[] =>
  questions.map(
    (question: Readonly<Question>): Question =>
      setDefaultValue(question, defaultValues?.[question.name]),
  );

export const flatten = (questions: readonly Readonly<Question>[] = []): SubQuestion[] =>
  questions.flatMap((question: Readonly<Question>): Question[] => {
    if (typeof question.questions !== 'undefined') {
      return flatten(question.questions).map(
        (subquestion: Readonly<SubQuestion>): SubQuestion => ({
          ...subquestion,
          name: `${question.name as string}.${subquestion.name as string}`,
        }),
      );
    }
    return [question];
  });
