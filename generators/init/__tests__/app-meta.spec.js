const appMeta = require('../app-meta');

describe('App meta prompt', () => {
  it('calls for prompt', async () => {
    const prompt = jest.fn();

    await appMeta.call({ prompt });

    expect(prompt).toHaveBeenCalledWith(expect.any(Array));
  });

  it('asks for app name', async () => {
    const prompt = jest.fn();

    await appMeta.call({ prompt });

    expect(prompt).toHaveBeenCalledWith(expect.arrayContaining([{
      type: 'input',
      name: 'name',
      message: 'What is your app\'s name?',
      default: expect.any(String),
    }]));
  });

  it('asks for app description', async () => {
    const prompt = jest.fn();

    await appMeta.call({ prompt });

    expect(prompt).toHaveBeenCalledWith(expect.arrayContaining([{
      type: 'input',
      name: 'description',
      message: 'What is your app\'s description?',
      default: '',
    }]));
  });
});
