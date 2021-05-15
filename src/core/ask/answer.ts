import type { Answers } from 'inquirer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-type-alias
type Value = any;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const memory: Map<string, Value> = new Map();

export const remember = (answerName: string, answer: Value): void => {
  memory.set(answerName, answer);
};

export const rememberAll = (answers: Readonly<Answers>): void => {
  Object.keys(answers).forEach((answerName: string): void => {
    remember(answerName, answers[answerName]);
  });
};

export const getAll = (answerNames?: string[]): Answers => {
  const obj: Answers = {};
  memory.forEach((value: Value, key: string): void => {
    if (typeof answerNames === 'undefined' || answerNames.includes(key)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      obj[key] = value;
    }
  });
  return obj;
};

export const get = (answerNames?: string[] | string): Answers => {
  if (typeof answerNames === 'string') {
    return memory.get(answerNames) as Answers;
  }

  return getAll(answerNames);
};

export const has = (answerName: string): boolean => memory.has(answerName);
export const forget = (answerName: string): boolean => memory.delete(answerName);
export const forgetAll = (): void => {
  memory.clear();
};

export const areUnanswered = (questionNames: readonly string[]): string[] =>
  questionNames.filter((questionName: string): boolean => !memory.has(questionName));

export const flatten = (answers: Readonly<Answers>, namePrefix?: string): Answers =>
  Object.keys(answers).reduce((flattened: Readonly<Answers>, answerName: string): Answers => {
    const name = typeof namePrefix !== 'undefined' ? `${namePrefix}.${answerName}` : answerName;
    if (typeof answers[answerName] === 'object') {
      return {
        ...flattened,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...flatten(answers[answerName], name),
      };
    }
    return {
      ...flattened,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [name]: answers[answerName],
    };
  }, {});
