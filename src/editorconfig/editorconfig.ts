import Generator from '../generator.ts';

export default class EditorConfigGenerator extends Generator {
  public async writing(): Promise<void> {
    const options = {
      gitconfig: this.hasFiles('.gitconfig'),
      html: this.hasFiles('**/*.html'),
      md: this.hasFiles('**/*.md'),
      packageJson: this.isNpmPackage(),
      php: this.hasFiles('**/*.php'),
      yaml: this.hasFiles('**/*.{yaml,yml}'),
    };

    await this.renderTpl('editorconfig', '.editorconfig', options);
  }
}
