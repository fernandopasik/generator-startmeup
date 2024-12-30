import type { PackageJson } from 'type-fest';
import Generator from '../generator.ts';

export default class FlowGenerator extends Generator {
  public async configuring(): Promise<void> {
    const name = this.packageJson.get('name') as PackageJson['name'];

    if (typeof name === 'undefined') {
      return;
    }

    this.packageJson.merge({
      scripts: {
        flowgen: `flowgen ${name}.d.ts --quiet -o ${name}.js.flow`,
      },
    });

    await this.addDevDependencies(['flow-bin', 'flowgen']);
  }

  public async writing(): Promise<void> {
    if (this.hasDevDependency('flow-bin')) {
      await this.renderTpl('flowconfig', '.flowconfig');
    }
  }
}
