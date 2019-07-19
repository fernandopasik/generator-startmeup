import { Answers } from 'inquirer';

export const flatten = (answers: Answers, namePrefix: string = ''): Answers =>
  Object.keys(answers).reduce((flattened: Answers, answerName: string) => {
    const name = namePrefix ? `${namePrefix}.${answerName}` : answerName;
    if (typeof answers[answerName] === 'object') {
      return {
        ...flattened,
        ...flatten(answers[answerName], name),
      };
    }
    return {
      ...flattened,
      [name]: answers[answerName],
    };
  }, {});
