import inquirer, { Question, Answers, Answer } from 'inquirer';

import { flatten as flattenQuestions, getNames, setDefaultValues } from './question';
import { flatten as flattenAnswers, get as getAnswers, areUnanswered, rememberAll } from './answer';

type AskQuestion = Question<Answer> & {
  name: string;
  questions?: AskQuestion[];
};

const ask = (questions: AskQuestion[], defaultValues: Answers = {}): Promise<Answers> => {
  const flattenedQuestions = flattenQuestions(questions);
  const flattenedQuestionNames = getNames(flattenedQuestions);
  const flattenedDefaults = flattenAnswers(defaultValues);

  const unansweredQuestionNames = areUnanswered(flattenedQuestionNames);
  const unansweredQuestions = flattenedQuestions.filter(question =>
    unansweredQuestionNames.includes(question.name),
  );

  const questionsToAsk = setDefaultValues(unansweredQuestions, flattenedDefaults);

  return inquirer.prompt(questionsToAsk).then(
    (answers: Answers): Answers => {
      rememberAll(answers);
      return {
        ...getAnswers(flattenedQuestionNames),
        ...answers,
      };
    },
  );
};

export default ask;
