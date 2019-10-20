import inquirer, { Answers } from 'inquirer';

import {
  flatten as flattenQuestions,
  getNames,
  setDefaultValues,
  Question,
  SubQuestion,
} from './question';
import { flatten as flattenAnswers, get as getAnswers, areUnanswered, rememberAll } from './answer';

const ask = async (questions: Question[], defaultValues: Answers = {}): Promise<Answers> => {
  const flattenedQuestions = flattenQuestions(questions);
  const flattenedQuestionNames = getNames(flattenedQuestions);
  const flattenedDefaults = flattenAnswers(defaultValues);

  const unansweredQuestionNames = areUnanswered(flattenedQuestionNames);
  const unansweredQuestions = flattenedQuestions.filter((question: SubQuestion): boolean =>
    unansweredQuestionNames.includes(question.name),
  );

  const questionsToAsk = setDefaultValues(unansweredQuestions, flattenedDefaults);

  const prompted = await inquirer.prompt(questionsToAsk).then(
    (answers: Answers): Answers => {
      rememberAll(flattenAnswers(answers));
      return {
        ...getAnswers(flattenedQuestionNames),
        ...answers,
      };
    },
  );

  return prompted;
};

export default ask;
