import Generator from '../generator.js';

export default class EditorConfigGenerator extends Generator {
  public writing(): void {
    const options = {
      gitconfig: this.hasFiles('.gitconfig'),
      html: this.hasFiles('**/*.html'),
      md: this.hasFiles('**/*.md'),
      packageJson: this.isNpmPackage(),
      php: this.hasFiles('**/*.php'),
      yaml: this.hasFiles('**/*.{yaml,yml}'),
    };

    this.renderTpl('editorconfig', '.editorconfig', options);
  }
}
