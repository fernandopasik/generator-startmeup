import 'core-js/features/array/flat-map';
import { Answers, Question as InquirerQuestion } from 'inquirer';

interface InquirerQuestions extends InquirerQuestion {
  choices?: string[];
}

export type SubQuestion = InquirerQuestions & {
  name: string;
};

export type Question = InquirerQuestions & {
  name: string;
  questions?: Question[];
};

export const getNames = (questions: Question[]): string[] =>
  questions.map((question: Question): string => question.name);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDefaultValue = (question: Question, defaultValue?: any): Question => ({
  ...question,
  default: defaultValue || question.default,
});

export const setDefaultValues = (questions: Question[] = [], defaultValues?: Answers): Question[] =>
  questions.map(
    (question: Question): Question => setDefaultValue(question, defaultValues?.[question.name]),
  );

export const flatten = (questions: Question[] = []): SubQuestion[] =>
  questions.flatMap((question: Question): Question[] => {
    if (question.questions) {
      return flatten(question.questions).map(
        (subquestion: SubQuestion): SubQuestion => ({
          ...subquestion,
          name: `${question.name}.${subquestion.name}`,
        }),
      );
    }
    return [question];
  });
