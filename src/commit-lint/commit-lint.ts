import type { modules } from '../core';
import { Generator } from '../core';
import config from './config';

export default class CommitLintGenerator extends Generator {
  public moduleConfig: modules.ModuleConfig = config;

  public async initializing(): Promise<void> {
    await super.initializing();
  }

  public async prompting(): Promise<void> {
    await super.prompting();
  }

  public async writing(): Promise<void> {
    await super.writing();
  }

  public install(): void {
    super.install();
  }
}
