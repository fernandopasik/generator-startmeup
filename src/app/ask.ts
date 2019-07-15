import inquirer, { Question, Answers, Answer } from 'inquirer';
import { pick } from 'lodash';

let memory: Answers = {};

const ask = (questions: Question<Answer>[], defaultValues?: Answers): Promise<Answers> => {
  const questionNames = questions.map(
    (question: Question<Answer>): string => question.name as string,
  );
  const storedAnswers = pick(memory, questionNames);
  const questionsToAsk = questions
    .filter(
      (question: Question<Answer>): boolean => !!question.name && !storedAnswers[question.name],
    )
    .map(
      (question: Question<Answer>): Question<Answer> => ({
        ...question,
        default:
          (question.name && defaultValues && defaultValues[question.name]) || question.default,
      }),
    );

  return inquirer.prompt(questionsToAsk).then((answers: Answers): Answers => {
    Object.assign(memory, answers);
    return {
      ...answers,
      ...storedAnswers,
    };
  });
};

export const getAnswers = (): Answers => memory;
export const clearAnswers = (): void => {
  memory = {};
};

export default ask;
