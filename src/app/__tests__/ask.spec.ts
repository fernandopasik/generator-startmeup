import inquirer from 'inquirer';
import ask, { getAnswers, clearAnswers } from '../ask';

describe('Ask questions', () => {
  test('uses inquirer', async () => {
    clearAnswers();
    const questions = [{ name: 'question1' }, { name: 'question2' }];
    const spy = jest.spyOn(inquirer, 'prompt').mockResolvedValue(Promise.resolve());

    await ask(questions);

    expect(spy).toHaveBeenCalledWith(questions);
    spy.mockRestore();
  });

  test('responds with answers', async () => {
    clearAnswers();
    const questions = [{ name: 'question1' }, { name: 'question2' }];
    const answers = { question1: 'example1', question2: 'example2' };
    const spy = jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve(answers));

    const response = await ask(questions);
    expect(response).toStrictEqual(answers);

    spy.mockRestore();
  });

  test('stores anwers', async () => {
    clearAnswers();
    const questions = [{ name: 'question1' }, { name: 'question2' }];
    const answers = { question1: 'example1', question2: 'example2' };
    const spy = jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve(answers));

    await ask(questions);

    expect(getAnswers()).toStrictEqual(answers);

    spy.mockRestore();
  });

  test('uses inquirer on questions not asked before', async () => {
    clearAnswers();
    const questions1 = [{ name: 'question1' }, { name: 'question2' }];
    const questions2 = [{ name: 'question1' }, { name: 'question3' }];
    const answers1 = { question1: 'example1', question2: 'example2' };
    const spy = jest.spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce(Promise.resolve(answers1))
      .mockResolvedValueOnce(Promise.resolve({}));

    await ask(questions1);
    await ask(questions2);

    expect(spy).toHaveBeenLastCalledWith([{ name: 'question3' }]);

    spy.mockRestore();
  });

  test('responds with a remembered answer', async () => {
    clearAnswers();
    const questions1 = [{ name: 'question1' }, { name: 'question2' }];
    const questions2 = [{ name: 'question1' }, { name: 'question3' }];
    const answers1 = { question1: 'example1', question2: 'example2' };
    const answers2 = { question3: 'example3' };
    const spy = jest.spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce(Promise.resolve(answers1))
      .mockResolvedValueOnce(Promise.resolve(answers2));

    await ask(questions1);
    const response = await ask(questions2);
    expect(response).toStrictEqual({ question1: 'example1', ...answers2 });

    spy.mockRestore();
  });
});
