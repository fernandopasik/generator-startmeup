# StartMeUp Generator

[![Build Status][badge-ci]][url-ci] [![Coverage Status][badge-cov]][url-cov] [![Known Vulnerabilities][badge-sec]][url-sec]

[![code style: prettier][badge-format]][url-format] [![npm version][badge-version]][url-version] [![Dependency Status][badge-deps]][url-deps] [![devDependency Status][badge-deps-dev]][url-deps-dev]

[badge-ci]: https://circleci.com/gh/fernandopasik/generator-startmeup.svg?style=svg
[badge-cov]: https://codecov.io/gh/fernandopasik/generator-startmeup/branch/master/graph/badge.svg
[badge-deps-dev]: https://david-dm.org/fernandopasik/generator-startmeup/dev-status.svg
[badge-deps]: https://david-dm.org/fernandopasik/generator-startmeup/status.svg
[badge-format]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat
[badge-sec]: https://snyk.io/test/github/fernandopasik/generator-startmeup/badge.svg?targetFile=package.json
[badge-version]: https://img.shields.io/npm/v/generator-startmeup.svg?logo=npm
[url-ci]: https://circleci.com/gh/fernandopasik/generator-startmeup 'Build Status'
[url-cov]: https://codecov.io/gh/fernandopasik/generator-startmeup 'Coverage Status'
[url-deps-dev]: https://david-dm.org/fernandopasik/generator-startmeup?type=dev 'Dev Dependency Status'
[url-deps]: https://david-dm.org/fernandopasik/generator-startmeup 'Dependency Status'
[url-format]: https://github.com/prettier/prettier 'code style: prettier'
[url-sec]: https://snyk.io/test/github/fernandopasik/generator-startmeup?targetFile=package.json 'Known Vulnerabilities'
[url-version]: https://www.npmjs.com/package/generator-startmeup 'npm version'

Yeoman generator for quickly set up your **dotfiles** and some other minor configurations. It's composed by a collection of subgenerators to do project tasks.

## SubGenerators

### Write or update package.json

- Reads current package.json
- Parses information and sets parameters from existing package.json properties
- Asks for data for based on those parameters
- Composes the new package.json
- Sorts package.json properties
- Writes new version of package.json

### Compiler

- Reads current package.json and looks for packages
- Asks for choosing one
- Writes configuration files
- Installs dependencies

### Src folder

1. Read dependencies
2. Read existing `package.json`
3. Merge dependencies, devDependencies, peerDependencies
4. If using typescript then set `index.ts`, else set `index.js`
5. If using react then set `x` at the end
6. Write index file

### Prettier

1. Ask if want to use
2. Add prettier to dev dependencies
3. Set prettier config file

### Commit Lint

1. Ask if want to use
2. Add cli and config to dev dependencies
3. Set config file
