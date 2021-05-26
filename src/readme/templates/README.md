# <%= name %>

<%= description %>

<!-- BADGES - START -->

<% if (size) { -%>
[![Gzip Bundle Size](http://img.badgesize.io/https://unpkg.com/<%= npmPackage %>/<%= npmPackage %>.min.js?compression=gzip)](https://unpkg.com/<%= npmPackage %>/<%= npmPackage %>.min.js 'Gzip Bundle Size')
<% } -%>
<% if (circleCi) { -%>
[![Build Status](https://circleci.com/gh/<%= githubOrg %>/<%= githubRepo %>.svg?style=svg)](https://circleci.com/gh/<%= githubOrg %>/<%= githubRepo %> 'Build Status')
<% } -%>
<% if (codeCov) { -%>
[![Coverage Status](https://codecov.io/gh/<%= githubOrg %>/<%= githubRepo %>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%= githubOrg %>/<%= githubRepo %> 'Coverage Status')
<% } -%>
<% if (sec) { -%>
[![Known Vulnerabilities](https://snyk.io/test/github/<%= githubOrg %>/<%= githubRepo %>/badge.svg?targetFile=package.json)](https://snyk.io/test/github/<%= githubOrg %>/<%= githubRepo %>?targetFile=package.json 'Known Vulnerabilities')
<% } -%>

<% if (allContributors) { -%>
[![All Contributors](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](#contributors)
<% } -%>
<% if (npm) { -%>
[![npm version](https://img.shields.io/npm/v/<%= githubRepo %>.svg?logo=npm)](https://www.npmjs.com/package/<%= githubRepo %> 'npm version')
[![npm downloads](https://img.shields.io/npm/dm/<%= githubRepo %>.svg)](https://www.npmjs.com/package/<%= githubRepo %> 'npm downloads')
<% } -%>

<!-- BADGES - END -->

## License

<%= license %> (c) <%= year %> [<%= authorName %>](<%= authorUrl %>)
