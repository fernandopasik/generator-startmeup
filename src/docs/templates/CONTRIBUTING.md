# Contributing

## Reporting Bugs or suggesting features

Ensure the bug or feature has not been reported before searching by [searching](https://github.com/<%= githubOrg %>/<%= githubRepo %>/issues) first. If no similar issue is found please submit a [new](https://github.com/<%= githubOrg %>/<%= githubRepo %>/issues/new/choose) one.

## Submitting changes

<% if (false) { -%>

<!-- prettier-ignore-start -->
<%_ } -%>
1. Fork the project
2. Create a new branch
3. Commit your proposed changes
4. Consider adding test cases for any new functionality
5. Submit a pull request
6. Please add a clear description of the problem and solution
7. Include any related issue number
8. Please ensure the PR passes the automated checks
<% if (circleCi) { -%>
   - [Circle CI](https://circleci.com/gh/<%= githubOrg %>/<%= githubRepo %>)
<%_ } -%>
<% if (codeCov) { -%>
   - [Codecov](https://codecov.io/gh/<%= githubOrg %>/<%= githubRepo %>)
<%_ } -%>

<% if (commitlint || eslint || prettier) { -%>
## Styleguides

<%_ } -%>
<% if (prettier) { -%>
- [Prettier](https://prettier.io) will catch most styling issues that may exist in your code. You can check the status of your code styling by simply running `yarn prettier`.
<%_ } -%>
<% if (commitlint) { -%>
- Git commit messages are checked with [commitlint](https://github.com/marionebl/commitlint) and follow the [conventional commits rules](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-conventional#rules).
<%_ } -%>
<% if (eslint) { -%>
- JavaScript styles are checked with [eslint](https://eslint.org/) and follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
<%_ } -%>

<% if (false) { -%>
<!-- prettier-ignore-end -->

<% } %>
