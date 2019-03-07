const path = require('path');

const Base = require('../base');
const getChecks = require('./checks');
const getStyleguides = require('./styleguides');

module.exports = class extends Base {
  async main() {
    await this.promptFields(['appName', 'appDescription', 'authorName', 'githubConfirm', 'githubUsername', 'githubRepo']);

    const options = {
      githubRepo: '',
      ...this.answers,
      checks: getChecks.call(this),
      styleguides: getStyleguides.call(this),
      year: new Date().getFullYear(),
    };

    ['LICENSE', 'README.md', 'CONTRIBUTING.md'].forEach((template) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template),
        options,
      );
    });

    const files = [
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.github/ISSUE_TEMPLATE/bug_report.md',
      '.github/ISSUE_TEMPLATE/feature_request.md',
      'CODE_OF_CONDUCT.md',
    ];

    files.forEach((file) => {
      this.fs.copy(
        path.join(__dirname, '../../', file),
        this.destinationPath(file),
      );
    });
  }
};
