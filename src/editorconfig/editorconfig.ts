import Generator from '../generator';

export default class EditorConfigGenerator extends Generator {
  public writing(): void {
    const options = {
      html: this.hasFiles('**/*.html'),
      php: this.hasFiles('**/*.php'),
      md: this.hasFiles('**/*.md'),
      yaml: this.hasFiles('**/*.{yaml,yml}'),
      packageJson: this.hasFiles('package.json'),
    };

    this.renderTemplate('editorconfig', '.editorconfig', options);
  }
}
