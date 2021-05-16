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

  public hasDependency(name: string): boolean {
    return typeof this.packageJson.getPath(`dependencies.${name}`) !== 'undefined';
  }

  public hasDevDependency(name: string): boolean {
    return typeof this.packageJson.getPath(`devDependencies.${name}`) !== 'undefined';
  }

  public hasAnyDependency(name: string): boolean {
    return this.hasDependency(name) || this.hasDevDependency(name);
  }
}
