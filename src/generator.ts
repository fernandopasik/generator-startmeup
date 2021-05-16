import Generator from 'yeoman-generator';

interface Answers {
  confirm: boolean;
}

export default class extends Generator {
  public async confirm(message: string, defaultValue = true): Promise<boolean> {
    const { confirm } = await this.prompt<Answers>([
      {
        type: 'confirm',
        name: 'confirm',
        message,
        default: defaultValue,
      },
    ]);

    return confirm;
  }
}
