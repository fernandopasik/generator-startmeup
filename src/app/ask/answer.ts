import { Answers } from 'inquirer';

const memory: Map<string, any> = new Map();

export const remember = (answerName: string, answer: any): void => {
  memory.set(answerName, answer);
};

export const rememberAll = (answers: Answers): void => {
  Object.keys(answers).forEach(answerName => {
    remember(answerName, answers[answerName]);
  });
};

export const getAll = (answerNames?: string[]): Answers => {
  const obj: Answers = {};
  for (let [key, value] of memory) {
    if (!answerNames || answerNames.includes(key)) {
      obj[key] = value;
    }
  }
  return obj;
};

export const get = (answerNames?: string | string[]): any => {
  if (typeof answerNames === 'string') {
    return memory.get(answerNames);
  }

  return getAll(answerNames);
};

export const has = (answerName: string): boolean => memory.has(answerName);
export const forget = (answerName: string): boolean => memory.delete(answerName);
export const forgetAll = (): void => memory.clear();

export const areUnanswered = (questionNames: string[]) =>
  questionNames.filter(questionName => !memory.has(questionName));

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
