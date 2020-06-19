### [0.23.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.23.0...v0.23.1) (2020-03-25)

### Bug Fixes

- missing parser options in eslint for ts ([f1b666a](https://github.com/fernandopasik/generator-startmeup/commit/f1b666ad3531929f96440b8c1277ea54e7b9095b))
- split jest junit config vars ([559c0d4](https://github.com/fernandopasik/generator-startmeup/commit/559c0d41ab1ce58d86c26b2827e57254839b4d8c))

### Styles

- ignore type alias in some cases ([1f8fafc](https://github.com/fernandopasik/generator-startmeup/commit/1f8fafce8c7fd1258514bd7bd2532b1d3781e2e9))
- remove no needed type alias ([0596a1e](https://github.com/fernandopasik/generator-startmeup/commit/0596a1ef967a80c7daa8de4a94d769b4cc99274c))
- resolve readonly parameter warnings ([203ce4d](https://github.com/fernandopasik/generator-startmeup/commit/203ce4db39275b748dd365ea52678d84ef43b95f))
- resolve readonly parameter warnings ([048a321](https://github.com/fernandopasik/generator-startmeup/commit/048a3211ec17722d40bef3ab32557e6a6ae367b5))
- resolve readonly parameter warnings ([f145dfb](https://github.com/fernandopasik/generator-startmeup/commit/f145dfbf7e1c887d06b67fa231218845b68becb8))

### Miscellaneous Chores

- revert update junit jest reporter method ([d71fe71](https://github.com/fernandopasik/generator-startmeup/commit/d71fe71c16462b69c5bc9472e33c7410704a8909))
- run tests in series ([6d9817c](https://github.com/fernandopasik/generator-startmeup/commit/6d9817ceacb5bcbd7c1a708d98c6c68775313911))
- update dependencies ([76da23f](https://github.com/fernandopasik/generator-startmeup/commit/76da23fa1a40410c8aa835b59a3986d71013c7d8))
- update dependencies ([e51d394](https://github.com/fernandopasik/generator-startmeup/commit/e51d394ff501835b998d63b49fa16cbd3cf8d721))
- update junit jest reporter method ([c993db9](https://github.com/fernandopasik/generator-startmeup/commit/c993db937eb1b07e2e95e32e9e6859ac8fff4f5f))

## [0.23.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.22.1...v0.23.0) (2020-03-23)

### Features

- tsconfig all config include jest-enzyme and ignoring flow files ([0b85062](https://github.com/fernandopasik/generator-startmeup/commit/0b850628cc38133d53fd3d0bd7698905760143bc))

### Bug Fixes

- add ignore magic numbers rule exception ([e1b795b](https://github.com/fernandopasik/generator-startmeup/commit/e1b795bf817e3e0b236a555fc3c0844a2aaf84b2))
- no need to exclude node_modules in tsconfig ([b154bda](https://github.com/fernandopasik/generator-startmeup/commit/b154bda88e51ad19a688a0f6fd865f14546e5b67))
- set file in cache after loading ([12e2683](https://github.com/fernandopasik/generator-startmeup/commit/12e2683a1c49b2de6d722eda911597f915d423b1))
- set imported file in cache with filename key ([0fc0ab7](https://github.com/fernandopasik/generator-startmeup/commit/0fc0ab74efc4cb3857026005752922b9ddee930a))
- update store before saving file ([17cae1d](https://github.com/fernandopasik/generator-startmeup/commit/17cae1dfc5383f41903ee20698df48a2dc9ed8c7))
- use generics for loading configs ([e549a1e](https://github.com/fernandopasik/generator-startmeup/commit/e549a1edbf72bfba06b9fdbe132513d002925d4e))

### Tests

- add missing tests for import all ([fa1e0e3](https://github.com/fernandopasik/generator-startmeup/commit/fa1e0e31eea1f303b7b7c348fe06a9313d2ea45a))
- load file test cases ([a629ac2](https://github.com/fernandopasik/generator-startmeup/commit/a629ac2f0593ab1b8766d01b29782b55378ad0e4))

### Code Refactoring

- deprecate dependencies import from method ([d5301ab](https://github.com/fernandopasik/generator-startmeup/commit/d5301abd3f881064b8723dc31ae9a9034a057669))
- import all dependencies from package.json ([3d42c0e](https://github.com/fernandopasik/generator-startmeup/commit/3d42c0e62864e546a5bb47b186e3fd64a0312d20))
- prettier module config ([774c6c2](https://github.com/fernandopasik/generator-startmeup/commit/774c6c2b44583a85bd976c712a9ff5e3a0438e88))

### Styles

- ignore magic numbers rule when it's zero ([48ccb78](https://github.com/fernandopasik/generator-startmeup/commit/48ccb787be807e8dd5746c3019ae29583a70d2c6))

### Miscellaneous Chores

- no need to exclude node_modules in tsconfig ([b9edb88](https://github.com/fernandopasik/generator-startmeup/commit/b9edb889d5cd1b7dc6207a11d395076e5e73c3ae))
- update dependencies ([f69ac85](https://github.com/fernandopasik/generator-startmeup/commit/f69ac85b11b3f735ca83fc9cb67f31f6271e79ce))

### [0.22.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.22.0...v0.22.1) (2020-03-22)

### Features

- install dependencies from core ([5561d17](https://github.com/fernandopasik/generator-startmeup/commit/5561d1753c9caac5cfc86bc5b3b7b497709d975d))

### Bug Fixes

- commit lint reponse not captured ([05b3fdc](https://github.com/fernandopasik/generator-startmeup/commit/05b3fdc14d3e99e1d658de7c461878eed416499e))
- prettier response not captured ([da6695b](https://github.com/fernandopasik/generator-startmeup/commit/da6695bbf8b877cc055d7827043abf44d9e33f62))
- skip install when composing generators ([8d27096](https://github.com/fernandopasik/generator-startmeup/commit/8d2709601320db7b773d57934977045cc3129894))

### Tests

- improve load prettier config cases ([c2efb01](https://github.com/fernandopasik/generator-startmeup/commit/c2efb018f465dfaa1f13f8c2b41b5e599e6ff6f4))

### Code Refactoring

- add main dependencies after prompting ([5f48948](https://github.com/fernandopasik/generator-startmeup/commit/5f489488f18b0d19f4334dd8ef3d8266ae8567fc))
- compiler sub generator answers ([e9023b8](https://github.com/fernandopasik/generator-startmeup/commit/e9023b84da091f4a3418101d0ea1d65755556c2f))
- expose get answers ([2cdfdd7](https://github.com/fernandopasik/generator-startmeup/commit/2cdfdd7b49bb56a19f47e2ae32c608e97a7ac868))
- load prettier config resolve config import ([f1a91c6](https://github.com/fernandopasik/generator-startmeup/commit/f1a91c6f8828bf03d648ab14d08fc9c3e2bf0307))
- move ask module ([d203cb8](https://github.com/fernandopasik/generator-startmeup/commit/d203cb8d24460da1ec1a3986188bfa3d68013b48))
- use ask module for prompting ([f58ee90](https://github.com/fernandopasik/generator-startmeup/commit/f58ee902b46f394a2b3ec245e1b856d3e27d56d4))
- use core to import ask module ([42a2537](https://github.com/fernandopasik/generator-startmeup/commit/42a2537fa32eb55540bd432823b4e0d02f935f19))

### Miscellaneous Chores

- remove unnecessary resolution ([b13b3d7](https://github.com/fernandopasik/generator-startmeup/commit/b13b3d759435656df83669d46e8c6f8efe80869e))
- update dependencies ([fd2dfe7](https://github.com/fernandopasik/generator-startmeup/commit/fd2dfe746283c483d4884bf695f98e9127b0d056))

### Styles

- resolve eslint warnings ([f282a90](https://github.com/fernandopasik/generator-startmeup/commit/f282a90b122c25931d8201968c2f874bf690221a))
- run prettier on file ([c4a05be](https://github.com/fernandopasik/generator-startmeup/commit/c4a05be36b37b55c97c6d9b068e45987d70a1eb8))

## [0.22.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.10...v0.22.0) (2020-03-20)

### Features

- setup binary for cli use ([f85a362](https://github.com/fernandopasik/generator-startmeup/commit/f85a3622755894e018e7bd6c3cd13fae55e55184))
- sort props in configs ([f233264](https://github.com/fernandopasik/generator-startmeup/commit/f233264fcd5737cbeb47ec8f652310c128b6614e))

### Bug Fixes

- convert to lowercase before comparing for sort ([ec90198](https://github.com/fernandopasik/generator-startmeup/commit/ec901981aeb1b0ed5ae1c8f6a5b5420e8cd1c44c))
- sort extends always to top in configs ([8e6ea2f](https://github.com/fernandopasik/generator-startmeup/commit/8e6ea2f9955e9a283208bc91fa0165ff83c875fb))
- sort objects in arrays to last ([abd8317](https://github.com/fernandopasik/generator-startmeup/commit/abd8317e61554483684389ad0de6b9b0151be81a))

### Miscellaneous Chores

- update dependencies ([27457db](https://github.com/fernandopasik/generator-startmeup/commit/27457db85ba2a79bfc412dcaaef7f532f2baddc3))

### Code Refactoring

- delete old utils ([8be6058](https://github.com/fernandopasik/generator-startmeup/commit/8be60586601c6a53c34e4e54eb6f524c38570876))
- package.json types ([cb8a860](https://github.com/fernandopasik/generator-startmeup/commit/cb8a8600e4d33443a4e66be7327c99eb74d289b9))
- split load config files ([e014fe1](https://github.com/fernandopasik/generator-startmeup/commit/e014fe14e8ee471d177275492cb383899bd09c16))

### Styles

- disable rule for tests ([854b1e3](https://github.com/fernandopasik/generator-startmeup/commit/854b1e3d34c1dca0ea3b30245c608928bb737e74))
- fix eslint errors ([47aa558](https://github.com/fernandopasik/generator-startmeup/commit/47aa558d26c42b74fbf8c25d0f43d709eb1e7071))
- ignore eslint warning in mock ([8e84763](https://github.com/fernandopasik/generator-startmeup/commit/8e84763cdad21d1d885a4e7a86409ec278f4ad3b))
- sort config props ([bd5c556](https://github.com/fernandopasik/generator-startmeup/commit/bd5c55682d4be1de7d4eb70f71c157c41a15d751))

### Tests

- improve object sorting ([c855594](https://github.com/fernandopasik/generator-startmeup/commit/c8555940b6986143235637613d8de6d44ea8b0dd))

### [0.21.10](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.9...v0.21.10) (2020-03-15)

### Bug Fixes

- overrides duplication on test files ([05b00d9](https://github.com/fernandopasik/generator-startmeup/commit/05b00d9a55e9ba001f67ff2235105eb99efcc84a))
- remove custom print width for configs ([13e39f9](https://github.com/fernandopasik/generator-startmeup/commit/13e39f963fe2ca37651187229846b7a81b4115b0))
- setup wrap prose in prettier generator ([ca3abd6](https://github.com/fernandopasik/generator-startmeup/commit/ca3abd6bbdb11101bd09b188e0fa8b0eb0610d5d))

### Styles

- never wrap prose with prettier ([f10cfd4](https://github.com/fernandopasik/generator-startmeup/commit/f10cfd4350946d2a5868b9845c20cce92d710768))
- run prettier on files ([4734a39](https://github.com/fernandopasik/generator-startmeup/commit/4734a3906430c96972c794343df611c82059eaa1))
- run prettier on files ([434d313](https://github.com/fernandopasik/generator-startmeup/commit/434d3136b02a66087818b1ade2cf3c4b311d1cca))
- run prettier on files ([43012f7](https://github.com/fernandopasik/generator-startmeup/commit/43012f7ba1e0ebbc416ffcb46ee391803a2c5278))

### Build System

- force unsecure package update ([a5fe02a](https://github.com/fernandopasik/generator-startmeup/commit/a5fe02a5dc87ac31d7b0485abf51273ca4fc4b43))
- remove allowjs from tsconfig as migration to ts was finished ([a57486e](https://github.com/fernandopasik/generator-startmeup/commit/a57486e30ba27071068fd929209b77e9b5c7079b))
- remove react from tsconfig ([1a2af58](https://github.com/fernandopasik/generator-startmeup/commit/1a2af58bd172959baccb21f3e710279e10d997f9))

### Code Refactoring

- current dir resolve ([9203e34](https://github.com/fernandopasik/generator-startmeup/commit/9203e34e67e97478ca313f43d7fa786849c4f094))
- move config type to store ([58597cf](https://github.com/fernandopasik/generator-startmeup/commit/58597cf4338c5d1dc4356ef4df3731504c3bedb0))

### Miscellaneous Chores

- set eslint warning for rule ([9df1e1f](https://github.com/fernandopasik/generator-startmeup/commit/9df1e1f67bf937e269439f9b9c651430134eb818))
- update dependencies ([ef0d7cf](https://github.com/fernandopasik/generator-startmeup/commit/ef0d7cf1e7a52c2c4116324ded1c9656315df584))
- update dependencies ([ffbc6ff](https://github.com/fernandopasik/generator-startmeup/commit/ffbc6ff62537ad4ce9742cdcbc67f4e708075f98))
- update dependencies ([9c06181](https://github.com/fernandopasik/generator-startmeup/commit/9c0618145f0c77e4131d4e17190f481f28e9138d))
- update dependencies ([b265144](https://github.com/fernandopasik/generator-startmeup/commit/b2651440fbc71841bcb0baeee2260090e553fb52))

### [0.21.9](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.8...v0.21.9) (2020-03-09)

### Bug Fixes

- for single key json configs add spaces ([25f449a](https://github.com/fernandopasik/generator-startmeup/commit/25f449a575d02ea5df1c941b8641428e5798053f))
- move commit lint hooks setup to hooks generator ([cf98c4d](https://github.com/fernandopasik/generator-startmeup/commit/cf98c4dc04be45b40eab07594d2f8c799e483ee0))

### Code Refactoring

- commit lint configs save ([f9ad1d9](https://github.com/fernandopasik/generator-startmeup/commit/f9ad1d924e1812405f9e6c175974bc50cb96181a))
- deprecate prettifyJson ([5c5e64c](https://github.com/fernandopasik/generator-startmeup/commit/5c5e64ce26b95dc00330e9d3cbbd132fad6d1cb6))
- lint config save ([9cf96c7](https://github.com/fernandopasik/generator-startmeup/commit/9cf96c7d52bec2beed3d3854a0688f8c9775cc84))
- lintstaged config save ([c0d69a5](https://github.com/fernandopasik/generator-startmeup/commit/c0d69a5ed5367aa0c1a45493c6eeddc895598fe8))
- save husky config ([65a1ea8](https://github.com/fernandopasik/generator-startmeup/commit/65a1ea8c876f31437daaf74b6e3e8fd53c871335))

### Documentation

- add commit lint generator ([56061d7](https://github.com/fernandopasik/generator-startmeup/commit/56061d7a226f9bae4c6e2182c645816fb2ac8cb1))
- add prettier sub gen ([d820fd3](https://github.com/fernandopasik/generator-startmeup/commit/d820fd35bd2862d2cf8a34b583b1e96f8a5a9a2f))

### Miscellaneous Chores

- update dependencies ([bce2f6f](https://github.com/fernandopasik/generator-startmeup/commit/bce2f6fbf2ac9f23295852204b3f65677183b6f1))

### [0.21.8](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.7...v0.21.8) (2020-03-09)

### Bug Fixes

- sort tsconfig excludes alphabetically ([d8c8bf3](https://github.com/fernandopasik/generator-startmeup/commit/d8c8bf32e2c977aff560366bc1bc6f2b2d9e6d20))

### Styles

- run prettier on config ([1c75038](https://github.com/fernandopasik/generator-startmeup/commit/1c750389891e7675037b17e6f1784ac7c98a8fb0))
- sort tsconfig props ([2ffc060](https://github.com/fernandopasik/generator-startmeup/commit/2ffc060dcbb1c9b4eed429d1f126bcef29792db0))

### Code Refactoring

- rename importFromPkg to importFrom ([bbe3103](https://github.com/fernandopasik/generator-startmeup/commit/bbe31036a6a5aeeeab7f66d9c952944efdb95e30))
- rename removeAll to clear ([cf66886](https://github.com/fernandopasik/generator-startmeup/commit/cf66886960a5149dc625ba8b2814cb2c8529e619))
- saving compilers configs ([9eb111f](https://github.com/fernandopasik/generator-startmeup/commit/9eb111fadb489071e3f2383fccff2924ae1ffda1))
- split core configs in multiple files ([11b1548](https://github.com/fernandopasik/generator-startmeup/commit/11b15485e6050956e736bc6c6b5652a9a970de37))
- split core dependencies in multiple files ([e27f07b](https://github.com/fernandopasik/generator-startmeup/commit/e27f07b4e1304370381cd298c80aac75b3c0e489))
- tsconfig exclude generation ([af5b654](https://github.com/fernandopasik/generator-startmeup/commit/af5b654d0e869d306d8150d6514e18aae4168736))

### [0.21.7](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.6...v0.21.7) (2020-03-08)

### Bug Fixes

- do not copy license or readme if they exist already ([b3c4cd6](https://github.com/fernandopasik/generator-startmeup/commit/b3c4cd62f5181401d7e5e4f3ac9f0918649ec7c2))
- remove 2 spaces for json printing ([aecfe39](https://github.com/fernandopasik/generator-startmeup/commit/aecfe39f2ed2908ead148b157bff6ff65ca0cce5))
- use smaller print width in prettier for configs ([630e2a3](https://github.com/fernandopasik/generator-startmeup/commit/630e2a3cd1deafc17525478f7127c49ecb8927a5))

### Miscellaneous Chores

- update dependencies ([548f6e4](https://github.com/fernandopasik/generator-startmeup/commit/548f6e401ff360fffdff9222681f862bc5ad37f5))

### Build System

- circle ci workflows setup ([8afabc5](https://github.com/fernandopasik/generator-startmeup/commit/8afabc5bf4ff2ba5cc8ec3184532cd205a8d42e6))

### [0.21.6](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.5...v0.21.6) (2020-03-06)

### Features

- generate tsconfig file for tests and lint ([c48ce08](https://github.com/fernandopasik/generator-startmeup/commit/c48ce08b8fad9c668b0cbd8b11c3c360d2c35685))

### Bug Fixes

- exclude storybook files in tsconfig generator ([b5134cd](https://github.com/fernandopasik/generator-startmeup/commit/b5134cd92cc4bee69d928966c8317892168a584b))
- exclude test files in tsconfig ([8bda38e](https://github.com/fernandopasik/generator-startmeup/commit/8bda38eb784cb00e9c7121e07bb16194aa9c7a20))
- exclude test files in tsconfig generator ([ac03173](https://github.com/fernandopasik/generator-startmeup/commit/ac03173f2195bf3ee02a6d5f6c137ff0a901d32e))
- tsconfig all includes root js files only ([7f9d48b](https://github.com/fernandopasik/generator-startmeup/commit/7f9d48bce7c8949017e89180a05d76fca1165136))

### Miscellaneous Chores

- update dependencies ([088a5f4](https://github.com/fernandopasik/generator-startmeup/commit/088a5f4156e297817207e876f17bd7bf8c830ca9))

### Styles

- run prettier on config ([d4267a7](https://github.com/fernandopasik/generator-startmeup/commit/d4267a7734b5c79ad91e9f322dd34a49109638fb))
- set to warning a new eslint rule for now ([833d98f](https://github.com/fernandopasik/generator-startmeup/commit/833d98f60296259de6acff140de92f6f2b32a29d))

### [0.21.5](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.4...v0.21.5) (2020-03-02)

### Bug Fixes

- do not include eslint flow plugin if only generating from ts ([d3b3ce3](https://github.com/fernandopasik/generator-startmeup/commit/d3b3ce3ed6bac4d3bf417fef70305267c01f974c))
- do not use forEach with await ([a61eef1](https://github.com/fernandopasik/generator-startmeup/commit/a61eef114f1265a7a4b04e3841d2c048433a0129))
- for sets the correct method is values ([dd57e7d](https://github.com/fernandopasik/generator-startmeup/commit/dd57e7d67f16063441294a891ecd2b25b602d3bf))
- get rid of anyjson type ([6f250fb](https://github.com/fernandopasik/generator-startmeup/commit/6f250fbc7576b0cc79af76fb68973ffe63a1b536))
- include react and lit eslint plugins also when in peer dependencies ([dd1cd40](https://github.com/fernandopasik/generator-startmeup/commit/dd1cd4015981a6409df73a66d45a5c0d28606d3b))
- missing await for saving configs ([3e28b1e](https://github.com/fernandopasik/generator-startmeup/commit/3e28b1e9c89e8e7e687a031c11942700ad9eb550))
- use typescript eslint plugin with all rules ([9748eea](https://github.com/fernandopasik/generator-startmeup/commit/9748eead4f52da826dc0f06d76fb70f951c6ea84))

### Code Refactoring

- remove version when adding dependencies ([8359873](https://github.com/fernandopasik/generator-startmeup/commit/8359873bfbf42edc2e0e03a2c045c4eacd4c4c11))

### Styles

- activate typescript eslint all config and temporary add warnings ([1870efa](https://github.com/fernandopasik/generator-startmeup/commit/1870efa95a0a476ae446449a60e868d3f9b3cb52))
- add missing types ([d9ac377](https://github.com/fernandopasik/generator-startmeup/commit/d9ac377f3de238a61a8d154176fed2002350aed5))
- autofix some eslint rules ([4b988d0](https://github.com/fernandopasik/generator-startmeup/commit/4b988d03201421897b7dc8e334e40ba9c4c345c5))
- fix boolean expressions errors ([698500f](https://github.com/fernandopasik/generator-startmeup/commit/698500f9f449d05c5901196dab8616978bb18c2a))
- fix eslint warnings ([b6549db](https://github.com/fernandopasik/generator-startmeup/commit/b6549db2265d7d3b0de08153bbcf695e48feec61))
- fix prefer nullish coalescing rule ([af8d8d3](https://github.com/fernandopasik/generator-startmeup/commit/af8d8d30908a89dc01ccb42db5cadae7f49f30b4))
- fix template literal eslint errors ([33adec0](https://github.com/fernandopasik/generator-startmeup/commit/33adec01d34d30d6a5aec8545adde778ea64aacc))
- fix typescript eslint errors ([a9cf44e](https://github.com/fernandopasik/generator-startmeup/commit/a9cf44e11eac8e22dfad4277a2d1d16fc7829822))

### [0.21.4](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.3...v0.21.4) (2020-03-01)

### Bug Fixes

- type error ([87a54a1](https://github.com/fernandopasik/generator-startmeup/commit/87a54a1aade85f28e0cb45e20e5d50e13630443b))
- type warning ([edcd14e](https://github.com/fernandopasik/generator-startmeup/commit/edcd14e5191365d05de5917f58c0e9ea57e77364))
- type warnings ([e4b0ab7](https://github.com/fernandopasik/generator-startmeup/commit/e4b0ab7a7eaf99c65f5dc30b0d79e4ab8471db88))

### Code Refactoring

- adding compiler dependencies ([4142485](https://github.com/fernandopasik/generator-startmeup/commit/41424855f78fc18b15e27b4a4231f00ee7f3a9c7))
- detect existing compilers ([fa8fc54](https://github.com/fernandopasik/generator-startmeup/commit/fa8fc544ec91ff4e534cce1ee5a4753bf640ae3a))

### Miscellaneous Chores

- update dependencies ([222bf49](https://github.com/fernandopasik/generator-startmeup/commit/222bf49f696857da111c916b62ff65ed7185e151))

### [0.21.3](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.2...v0.21.3) (2020-03-01)

### Bug Fixes

- copy subdirs in templates ([dcaf626](https://github.com/fernandopasik/generator-startmeup/commit/dcaf6260bdacf1220b89c7a75a969306f19b10f4))

### Code Refactoring

- move github files into templates ([0c08d4a](https://github.com/fernandopasik/generator-startmeup/commit/0c08d4a3b71d786d00c96d1627c08f9e5d9216ae))

### [0.21.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.1...v0.21.2) (2020-03-01)

### Bug Fixes

- move init files to templates ([caa9e70](https://github.com/fernandopasik/generator-startmeup/commit/caa9e70e6cc0f1b6685651bc09057d9c70253988))

### [0.21.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.21.0...v0.21.1) (2020-03-01)

### Bug Fixes

- do not override existing gitignore ([415d6f2](https://github.com/fernandopasik/generator-startmeup/commit/415d6f253d77790fe4bcb63471d54f57cc95b557))

## [0.21.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.20.1...v0.21.0) (2020-03-01)

### Bug Fixes

- remove npmignore copy from init subgenerator ([d9ece2b](https://github.com/fernandopasik/generator-startmeup/commit/d9ece2bf240416d013a9d662a08d039c19c33f55))

### Code Refactoring

- config loading and saving ([c846e31](https://github.com/fernandopasik/generator-startmeup/commit/c846e318ca49b7da65505bf41abf4fcdfdcf82a4))
- use new config loading for jest and prettier ([ee3d6f4](https://github.com/fernandopasik/generator-startmeup/commit/ee3d6f4a93b1017d6b0be6e71266dd449183ecf5))

### Miscellaneous Chores

- update dependencies ([27aaf79](https://github.com/fernandopasik/generator-startmeup/commit/27aaf79d5e4fdf0a3060c09c96bd9da132a63129))

### Build System

- replace npmignore with files attribute in package.json ([65ef415](https://github.com/fernandopasik/generator-startmeup/commit/65ef4153a97537c34bcafc402eb8feda1ed49971))

### [0.20.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.20.0...v0.20.1) (2020-02-29)

### Bug Fixes

- do not create main index file if one present ([59d6518](https://github.com/fernandopasik/generator-startmeup/commit/59d6518470402488a99d5f287af3fcdca5aceda8))
- non existent package.json main property load ([109cd87](https://github.com/fernandopasik/generator-startmeup/commit/109cd876166dfac9f79a37ee89d28d6f658dabf0))

## [0.20.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.19.4...v0.20.0) (2020-02-29)

### Bug Fixes

- add missing dependencies in hooks ([1522f73](https://github.com/fernandopasik/generator-startmeup/commit/1522f73978759e412c8c12a65690aa53abc7353a))
- import breaks when no package.json available ([53f5a05](https://github.com/fernandopasik/generator-startmeup/commit/53f5a05541a47fa601fcdefdacf4d7ec8ad4be55))

### Code Refactoring

- convert array to ts enum ([affb17c](https://github.com/fernandopasik/generator-startmeup/commit/affb17c2ba5f7d2de20a08e52fb74bc3782dc8b1))
- dependencies groupnames back to array ([90c0f72](https://github.com/fernandopasik/generator-startmeup/commit/90c0f72eb5021925654668d8e218c43c9cfce035))
- get dependencies ([bd22e23](https://github.com/fernandopasik/generator-startmeup/commit/bd22e23281501906a6dc913c9fdaa01ce3748b66))
- how to manage dependencies in sub generators ([a9e97b9](https://github.com/fernandopasik/generator-startmeup/commit/a9e97b985d31e0ef979c99723ff349c741b5e6cd))
- import dependencies from package.json ([063930a](https://github.com/fernandopasik/generator-startmeup/commit/063930a06cd4e532323adc0f546ace1eb2170c63))
- manage dependencies module ([31da696](https://github.com/fernandopasik/generator-startmeup/commit/31da6960fb9272454faba01b3c38c6d67cc677f4))

### Tests

- import empty package.json ([bce04b4](https://github.com/fernandopasik/generator-startmeup/commit/bce04b4faee455ccdbe41d04d62576d5067d80e4))

### [0.19.4](https://github.com/fernandopasik/generator-startmeup/compare/v0.19.3...v0.19.4) (2020-02-28)

### Bug Fixes

- babel config format bug ([c1025ba](https://github.com/fernandopasik/generator-startmeup/commit/c1025baf7f49a755dc25a67d83e61a79b1c3bc13))
- include js files in lint staged config ([4b0b4f6](https://github.com/fernandopasik/generator-startmeup/commit/4b0b4f698e7f4ad86ada98091c3d91a9f64ec42c))
- lint staged should always include js files ([82b18e7](https://github.com/fernandopasik/generator-startmeup/commit/82b18e7a9d0f943717a5a910025b2c769367c4ad))

### Code Refactoring

- lint staged config generation ([545dbfa](https://github.com/fernandopasik/generator-startmeup/commit/545dbfa6ec0f870538b774470b456a1a4157c462))

### Miscellaneous Chores

- update dependencies ([e8a7754](https://github.com/fernandopasik/generator-startmeup/commit/e8a7754a437f77d2413a3fa4d3ebe1c5676430e2))
- update typescript ([2941e00](https://github.com/fernandopasik/generator-startmeup/commit/2941e00f641a4c591edd5bf6c012104e52fb7996))

### [0.19.3](https://github.com/fernandopasik/generator-startmeup/compare/v0.19.2...v0.19.3) (2020-02-26)

### Bug Fixes

- add parser when formatting with prettier ([9d78537](https://github.com/fernandopasik/generator-startmeup/commit/9d785374c3eb8b5ef4ffa36bd5e76696c29e6a76))
- no react file matching in jest config ([b5706aa](https://github.com/fernandopasik/generator-startmeup/commit/b5706aa3aef946ed3f6d3d4c5e5b01315a635bf1))
- read default content from existing jest config ([c64895e](https://github.com/fernandopasik/generator-startmeup/commit/c64895e56470fb0bc9b349907e2b0f92d1d4f2ae))
- read existing config before building it ([747160e](https://github.com/fernandopasik/generator-startmeup/commit/747160ec4e6b49f8e6d2cfa59107bafe9ec93582))
- remove wrong jest config depending on type in package.json ([dda8d00](https://github.com/fernandopasik/generator-startmeup/commit/dda8d004d1e70e1f2933d52f8a9069a17694b792))
- use cjs for jest config if type module present in package.json ([f1953f7](https://github.com/fernandopasik/generator-startmeup/commit/f1953f7ec95888547701e8678d10de3e0a5f252e))

### Styles

- update eslint config ([447440e](https://github.com/fernandopasik/generator-startmeup/commit/447440e7029f8056b3e2e180de24a8d06d781aee))

### Code Refactoring

- generate jest config filename ([eb96a44](https://github.com/fernandopasik/generator-startmeup/commit/eb96a44905b7ea47c4e85b7e0550d88f02b1e5a9))
- rename build eslint config method ([52fefb3](https://github.com/fernandopasik/generator-startmeup/commit/52fefb3a7f3996dfc1056935a8daa1d0b385e519))
- rename testing to jest generator ([81d2bf3](https://github.com/fernandopasik/generator-startmeup/commit/81d2bf3bce0c0eeceba388bc9d7eb754d97c85ba))

### Miscellaneous Chores

- add missing types ([3efeaef](https://github.com/fernandopasik/generator-startmeup/commit/3efeaef4b6ee657691a8b3de7da0bf66f082105a))
- update dependencies ([fae6257](https://github.com/fernandopasik/generator-startmeup/commit/fae6257eab002d79002de68fa1c3583db920d339))

### [0.19.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.19.1...v0.19.2) (2020-02-25)

### Code Refactoring

- jest config generator methods ([c7a3d56](https://github.com/fernandopasik/generator-startmeup/commit/c7a3d568444afb21f71f146845f2e5f1c76adc6b))
- prettify eslint config ([25401bc](https://github.com/fernandopasik/generator-startmeup/commit/25401bc63710b1eeba1c57c0e0e0cc0e73ad6b13))

### Miscellaneous Chores

- update dependencies ([0041d33](https://github.com/fernandopasik/generator-startmeup/commit/0041d33e160123d54e37a5ce69b6f9e3d816f009))

### [0.19.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.19.0...v0.19.1) (2020-02-25)

### Documentation

- remove whitespace from contributing guideline ([2f16ebb](https://github.com/fernandopasik/generator-startmeup/commit/2f16ebbf3e5e9d189fdb0d97a4c26e1c87db0e2f))
- update contributing guidelines ([d5bd9a3](https://github.com/fernandopasik/generator-startmeup/commit/d5bd9a331226640a027eb288caa7c10df43b3d45))

### Code Refactoring

- sort package.json properties ([e3c09d6](https://github.com/fernandopasik/generator-startmeup/commit/e3c09d60d44dfa4a66b1ebdd89fa07f00697d42c))

### Miscellaneous Chores

- update dependencies ([0d562ce](https://github.com/fernandopasik/generator-startmeup/commit/0d562ced1ecd0943a99ca021f90cbcf63483752c))
- use es2020 in typescript config ([532d90b](https://github.com/fernandopasik/generator-startmeup/commit/532d90b5d821883b593a9e6ab6aaf83273071e2b))

### Styles

- run prettier on config ([dc7cd07](https://github.com/fernandopasik/generator-startmeup/commit/dc7cd075316615388cc2972755d48a9f9b74a626))

## [0.19.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.18.0...v0.19.0) (2020-02-25)

### Features

- exclude tests in main tsconfig ([6eabc59](https://github.com/fernandopasik/generator-startmeup/commit/6eabc593e2d13c096a5ea0bd139b3f587fdebcd7))
- has dev dependency method ([dbca6a7](https://github.com/fernandopasik/generator-startmeup/commit/dbca6a7f329593786c5d1eab14b37cbec7f0eebf))
- update lib to es2020 in tsconfig ([6e1670a](https://github.com/fernandopasik/generator-startmeup/commit/6e1670a9020f207c7e5c11cadc5348692b110005))

### Bug Fixes

- add missing default config in prettify json ([ebd4ee6](https://github.com/fernandopasik/generator-startmeup/commit/ebd4ee63b26f702ceba74855e716eae6a7c39b7c))
- add missing preset dependency ([dfc12f1](https://github.com/fernandopasik/generator-startmeup/commit/dfc12f1354da1259718340a864959017c13bc2db))
- do not include react in tsconfig if react not used ([b332ced](https://github.com/fernandopasik/generator-startmeup/commit/b332ced3714a7d8cb3cefcb3faa91527b8a47112))
- if ts present always use ts-jest ([8be7c4a](https://github.com/fernandopasik/generator-startmeup/commit/8be7c4a3f19b0130f48b4e0b9352b8fce5c907a0))
- use fs write when saving prettyfied content ([4bba9d6](https://github.com/fernandopasik/generator-startmeup/commit/4bba9d6dcdfd88b1068049a8182b99f5ab90eee9))
- use local project prettier config for formatting ([af6b637](https://github.com/fernandopasik/generator-startmeup/commit/af6b637e6cecd08518041b7abd8357a7b3627c07))

### Code Refactoring

- compilers babel config writting ([c6a4d8f](https://github.com/fernandopasik/generator-startmeup/commit/c6a4d8fb1e6f1927ad81d7961385a90509d07e86))
- import prettier methods ([233fdc5](https://github.com/fernandopasik/generator-startmeup/commit/233fdc59e92237e066d072822b3d62dac280a3b2))
- improve out and root dir ([15ed3c3](https://github.com/fernandopasik/generator-startmeup/commit/15ed3c3120f07019f5a03a31528e74cce0a700d0))
- improve prettify method types ([c268b86](https://github.com/fernandopasik/generator-startmeup/commit/c268b866ff5d067c3955bd5859a8a4cf7bbb5bf4))
- use function for tsconfig build ([e2fb81a](https://github.com/fernandopasik/generator-startmeup/commit/e2fb81a83e115cce2c2af4b4ca2e2a5f208085ae))
- use prettifyJson method for commit lint configs ([1451b51](https://github.com/fernandopasik/generator-startmeup/commit/1451b51deb3f593724996af0e76ad9a09a8f644b))

## [0.18.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.17.0...v0.18.0) (2020-02-22)

### Features

- prettier sub generator ([0b8692b](https://github.com/fernandopasik/generator-startmeup/commit/0b8692b4979378d80b730aec0a75499a1db16b73))

### Bug Fixes

- jest config cjs extension due to lack of esm support for now ([4cb12ac](https://github.com/fernandopasik/generator-startmeup/commit/4cb12ac0c4bb813daa991eac481556da3cd13c29))
- use verify task for pre push hook ([075c797](https://github.com/fernandopasik/generator-startmeup/commit/075c797c7992d07428ded5259859f7d9851edca8))

### Code Refactoring

- separate verify task ([743ed6c](https://github.com/fernandopasik/generator-startmeup/commit/743ed6cad06223ab9d59a0b7375cd33621707ede))
- use verify task for pre push ([e6ff923](https://github.com/fernandopasik/generator-startmeup/commit/e6ff923ae00f5a2a28ee7de2cf6d829b9ee97fc0))

### Miscellaneous Chores

- update dependencies ([659f813](https://github.com/fernandopasik/generator-startmeup/commit/659f8136eb16610c6a8d5e77aa8a18c15d30914f))

## [0.17.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.9...v0.17.0) (2020-02-20)

### Features

- use labels for github templates ([d68d68b](https://github.com/fernandopasik/generator-startmeup/commit/d68d68b8287910371b5e5b2a8aa12dc78ff44f38))

### Bug Fixes

- missing author for license sub generator ([7972089](https://github.com/fernandopasik/generator-startmeup/commit/7972089257cd9488b9a1c199c2a73ea81349a081))

### Styles

- run prettier on bug report template ([30dfd05](https://github.com/fernandopasik/generator-startmeup/commit/30dfd0503f177e0b35083327b31a44ab982e130b))

### Code Refactoring

- improve github templates ([43c1edc](https://github.com/fernandopasik/generator-startmeup/commit/43c1edc1e987c3ff89052ee8d32fd20dd2d217a4))

### [0.16.9](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.8...v0.16.9) (2020-02-18)

### Bug Fixes

- if typescript present add jest types ([bc7a61e](https://github.com/fernandopasik/generator-startmeup/commit/bc7a61e1f8c18e67100ccef762d9e6954410f498))
- use jest types for config options ([617e00e](https://github.com/fernandopasik/generator-startmeup/commit/617e00e5df13534e261bf398a5431c042ed7e649))

### Miscellaneous Chores

- update dependencies ([1ebcddc](https://github.com/fernandopasik/generator-startmeup/commit/1ebcddc0baa0a377e8d535ea664f391d1153e283))

### [0.16.8](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.7...v0.16.8) (2020-01-24)

### Miscellaneous Chores

- update dependencies ([9eb36c6](https://github.com/fernandopasik/generator-startmeup/commit/9eb36c634af487aae5e470c4ddf5161ad47b1284))

### [0.16.7](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.6...v0.16.7) (2020-01-21)

### Features

- util for flat and unflat object ([28e3683](https://github.com/fernandopasik/generator-startmeup/commit/28e3683e7cc34613caaa5142a68032d6d71a3f5d))

### Styles

- fix eslint rule ([012666c](https://github.com/fernandopasik/generator-startmeup/commit/012666c45a3e86548f089917eb0971be0951cb86))

### Miscellaneous Chores

- update dependencies ([9b27bf7](https://github.com/fernandopasik/generator-startmeup/commit/9b27bf70f31ffbd3caab339c0cf852d87723c885))
- update dependencies ([ef15a46](https://github.com/fernandopasik/generator-startmeup/commit/ef15a4664d9b741e131efad63f508dde93fc613d))

### [0.16.6](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.5...v0.16.6) (2019-11-09)

### Bug Fixes

- use prettier to format configs ([095874e](https://github.com/fernandopasik/generator-startmeup/commit/095874e69170111c878edd36dce18a4165b195cd))

### Miscellaneous Chores

- update dependencies ([9d7a378](https://github.com/fernandopasik/generator-startmeup/commit/9d7a378630927c02443127423b6adeb9e9cdc7b4))

### [0.16.5](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.4...v0.16.5) (2019-11-05)

### Bug Fixes

- sort commit lint hooks in sub generator ([220a36c](https://github.com/fernandopasik/generator-startmeup/commit/220a36c3a510b2df688870af60bca1488fabfecb))

### Styles

- run prettier on config ([1695a42](https://github.com/fernandopasik/generator-startmeup/commit/1695a427a0b8bd6dfab4edf63679845063464317))

### Miscellaneous Chores

- deprecate js files on test task ([345f8ad](https://github.com/fernandopasik/generator-startmeup/commit/345f8ad8a025ce499b8019991f5aae27972eea2e))
- update dependencies ([a89d569](https://github.com/fernandopasik/generator-startmeup/commit/a89d569db413e265a9b1d4200118e07bbdeca884))

### [0.16.4](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.3...v0.16.4) (2019-10-30)

### Bug Fixes

- delete plugins in eslint config when empty ([a6cc73c](https://github.com/fernandopasik/generator-startmeup/commit/a6cc73c02df5c4f1c022643dd86177d2e3bf52e6))
- delete prettier eslint rule when config present ([50864a8](https://github.com/fernandopasik/generator-startmeup/commit/50864a897191c0df78d8b04fc8eb2d50ddae3bc5))
- eslint prettier config ([b9c3b7c](https://github.com/fernandopasik/generator-startmeup/commit/b9c3b7c9ee6a6421aa7d0b72787fa5abc13a27f5))
- remove eslint plugins covered by the configs ([0aeafe1](https://github.com/fernandopasik/generator-startmeup/commit/0aeafe12537f86058d82fad3ac1cac73f7f4619d))

### [0.16.3](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.2...v0.16.3) (2019-10-30)

### Bug Fixes

- lint with prettier needs config ([026998e](https://github.com/fernandopasik/generator-startmeup/commit/026998ef066bd44671b19fceb3c5477b5fe88647))

### Miscellaneous Chores

- update dependencies ([0e91d7e](https://github.com/fernandopasik/generator-startmeup/commit/0e91d7ebd605b24db55012f768a87b589ee4d6e8))

### [0.16.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.1...v0.16.2) (2019-10-29)

### Bug Fixes

- activate prettier eslint plugin ([660f94c](https://github.com/fernandopasik/generator-startmeup/commit/660f94cf9e8fefbafb3767efd5b1d50c9f461a5e))
- add missing types ([95cdcd8](https://github.com/fernandopasik/generator-startmeup/commit/95cdcd8aa62d37ada3f1060a3a16cdf7668cda1e))
- add missing types in method parameters ([861d2d4](https://github.com/fernandopasik/generator-startmeup/commit/861d2d47332e34af574f2d9925f172856bccbb3a))
- boolean expressions eslint warnings ([c583f30](https://github.com/fernandopasik/generator-startmeup/commit/c583f30a0da802dc2a2267980fa7778f893bf098))
- default license choice ([18510d4](https://github.com/fernandopasik/generator-startmeup/commit/18510d4ee4afdc687f2e39e43de61e2d57a6eb6c))
- eslint warnings ([940ed20](https://github.com/fernandopasik/generator-startmeup/commit/940ed20403ee726a675a2827d19339653d51c2ad))
- eslint warnings ([90ce048](https://github.com/fernandopasik/generator-startmeup/commit/90ce0483a9e54e26048efacce40d699dff52ebda))

### Code Refactoring

- default parameter in method ([7124f1d](https://github.com/fernandopasik/generator-startmeup/commit/7124f1de3c642ce5b3833f687a2be2b8a069e6b0))
- flatten answer default params ([438f8bf](https://github.com/fernandopasik/generator-startmeup/commit/438f8bf69fef362dc65b1810e3ad76071066eeeb))

### Miscellaneous Chores

- update dependencies ([f1118a7](https://github.com/fernandopasik/generator-startmeup/commit/f1118a7cc323a5bc99fc944a022e3842eff78568))
- update dependencies ([2598dc2](https://github.com/fernandopasik/generator-startmeup/commit/2598dc208821921a5ae9ea4bfefa6e4e37769430))
- update dependencies ([1c9cfa5](https://github.com/fernandopasik/generator-startmeup/commit/1c9cfa5b301f275b6407f2c0bbb58e06cac752ea))

### [0.16.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.16.0...v0.16.1) (2019-10-21)

### Bug Fixes

- add ts accessibility to properties ([a7c4c1a](https://github.com/fernandopasik/generator-startmeup/commit/a7c4c1ac55ef865608e5eebbd5f5c7d272c23539))
- async function with await ([df5e2c5](https://github.com/fernandopasik/generator-startmeup/commit/df5e2c5ce3924593ad83a7c3962f4850ae273d1d))
- lint warnings ([46d3223](https://github.com/fernandopasik/generator-startmeup/commit/46d322337cce715aa5389ec521bc1946e41b7edf))
- lowercase test names lint error ([7f443b4](https://github.com/fernandopasik/generator-startmeup/commit/7f443b4c3eaed9ae34724dbda6ce2f5b025e4f58))
- non async function ([e8f56c4](https://github.com/fernandopasik/generator-startmeup/commit/e8f56c41f8b2fefda99544ef04e2ed6826f0e561))
- remove old eslint rule ([00024f8](https://github.com/fernandopasik/generator-startmeup/commit/00024f8371218ffdc9c7e2b5c7e963de608dc265))
- remove unneeded overrides in lint config ([0d7fe22](https://github.com/fernandopasik/generator-startmeup/commit/0d7fe22e487cf380f03fc853c1115635eed0c17f))
- remove unneeded types ([2518ad4](https://github.com/fernandopasik/generator-startmeup/commit/2518ad4cc2370030390042449f63399e9dd91645))
- remove unused property ([9620d97](https://github.com/fernandopasik/generator-startmeup/commit/9620d97f7bcf6683686c36b4ac7bbb711b539581))
- set parser options for lint ([2def8a0](https://github.com/fernandopasik/generator-startmeup/commit/2def8a0c83b4a80f2dca5b33646b60f421561ec3))
- sort package.json task ([1beee06](https://github.com/fernandopasik/generator-startmeup/commit/1beee068540a866682ebd3a04b87fdcf7ab36895))
- use default value for readJSON util ([56cfe5d](https://github.com/fernandopasik/generator-startmeup/commit/56cfe5d13d3c7285bd3b27cb747c39577f62568d))

### Styles

- pass prettier on config file ([fd3a043](https://github.com/fernandopasik/generator-startmeup/commit/fd3a0437441d4af5ac60cd44ad3728f06ed8eed8))

### Tests

- use it for test cases ([3ed4cd4](https://github.com/fernandopasik/generator-startmeup/commit/3ed4cd48334d2e6f5ef9b676b8ebd638153693cb))

### Miscellaneous Chores

- create task for checking types on all files ([e3037ae](https://github.com/fernandopasik/generator-startmeup/commit/e3037ae7741eaf7fe24304b90badfdae3b83efe3))
- update dependencies ([15a9922](https://github.com/fernandopasik/generator-startmeup/commit/15a9922d6b4212bd9c33dd42c5e0807a6a835abb))
- update dependencies ([d0a589a](https://github.com/fernandopasik/generator-startmeup/commit/d0a589ac2b833dace14d491189b3f0cdb7e83a6e))

## [0.16.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.15.0...v0.16.0) (2019-09-18)

### Features

- ask for license in package.json subgen ([abb7b7c](https://github.com/fernandopasik/generator-startmeup/commit/abb7b7cbda2eb0fd2eb5bdfa8859ff991a57cdee))

### Bug Fixes

- skip install when composing multiple sub gens ([4ba0042](https://github.com/fernandopasik/generator-startmeup/commit/4ba0042bba854abb3bbd917518320d33d34c01ab))

### Miscellaneous Chores

- remove roots from jest config ([134685a](https://github.com/fernandopasik/generator-startmeup/commit/134685a438497ed55756c1623a13ee9fb8ac120c))
- update dependencies ([567ccc5](https://github.com/fernandopasik/generator-startmeup/commit/567ccc5eeb794e57fcaafe6cc297b74c395ceac7))
- update dependencies ([852ae56](https://github.com/fernandopasik/generator-startmeup/commit/852ae5636342d934274705525f673dfd1186b958))
- update dev dependencies ([e4decc2](https://github.com/fernandopasik/generator-startmeup/commit/e4decc23fe1020cdf745ce99fcbe60a828ed2959))
- update dev dependencies ([1e131a2](https://github.com/fernandopasik/generator-startmeup/commit/1e131a2e8fcefe00287e9c66c2a85e5fb19fd776))
- update husky config ([c83188a](https://github.com/fernandopasik/generator-startmeup/commit/c83188a7a3b7478f1b1e384e3cd252ad5fc77bd9))

### Code Refactoring

- extract commit-lint sub gen ([3613ce2](https://github.com/fernandopasik/generator-startmeup/commit/3613ce2fa3bae46303f7c36ba27a7b84af2f8b4b))
- jest config setup ([2fe7b83](https://github.com/fernandopasik/generator-startmeup/commit/2fe7b8336bb486e1daba590617493c1a88582bbd))
- lint config sub gen ([57a6172](https://github.com/fernandopasik/generator-startmeup/commit/57a6172ae96ac554c644a0e7cebb5f7cd75519d4))
- rename test folder ([1b62c5d](https://github.com/fernandopasik/generator-startmeup/commit/1b62c5dac5e337ae43e61684d29e253cc75ba1e6))
- reorder scripts ([a4c1171](https://github.com/fernandopasik/generator-startmeup/commit/a4c11718f5b7094b96e3f44a06e56f4c3f0ceb56))
- tsconfig excludes for tests ([5a47e47](https://github.com/fernandopasik/generator-startmeup/commit/5a47e475e4aebe84f88edbabde9f1ee5d2b7c208))

## [0.15.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.14.0...v0.15.0) (2019-09-01)

### Code Refactoring

- deprecate old file ([8cc62cf](https://github.com/fernandopasik/generator-startmeup/commit/8cc62cf732bf2ff6eb49f9e5913b074419f5b434))
- eslint config ([dfe5a64](https://github.com/fernandopasik/generator-startmeup/commit/dfe5a6438a77c272490c9c4a8a39a5f13db9f181))
- lint sub generator ([448d5de](https://github.com/fernandopasik/generator-startmeup/commit/448d5defb9e1823e16b08a24bddaa183dd7f790c))
- move hooks sub generator to ts ([e61958e](https://github.com/fernandopasik/generator-startmeup/commit/e61958e56d8f08a6787d66bf035b7c34ad626b92))

### Tests

- revert root folder in jest config ([dcadf8e](https://github.com/fernandopasik/generator-startmeup/commit/dcadf8e3f482f758f2d0ad8e733108246aed63e3))

## [0.14.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.13.1...v0.14.0) (2019-09-01)

### Bug Fixes

- add types for prettier ([8391bfb](https://github.com/fernandopasik/generator-startmeup/commit/8391bfbb2e135721e3c8883648895ebf4f95fb37))
- lint errors ([617a9ca](https://github.com/fernandopasik/generator-startmeup/commit/617a9ca92d7929c6d58cd7aae819262c3aecf7ab))
- rename testing subgenerator ([beed02e](https://github.com/fernandopasik/generator-startmeup/commit/beed02e52301d8e158763cc11e61291e387fb83a))

### Miscellaneous Chores

- update dependencies ([0fc1d0d](https://github.com/fernandopasik/generator-startmeup/commit/0fc1d0d0bbfcfc250b923b83494a6912a6bb99e0))
- update husky ([acc1a2b](https://github.com/fernandopasik/generator-startmeup/commit/acc1a2b1a511406be3fb192ba9f68821d142c399))

### Styles

- reformat jest config ([6b42ebd](https://github.com/fernandopasik/generator-startmeup/commit/6b42ebd85d879ff5f058bd2bab8987d17aac4c9e))
- update prettier config ([a060209](https://github.com/fernandopasik/generator-startmeup/commit/a06020902465167b51808cd40713785188791a7d))

### Code Refactoring

- libraries answers ([8a85743](https://github.com/fernandopasik/generator-startmeup/commit/8a8574399974f8ff7cbe6e3ad0f09764e293aae1))
- move testing subgenerator to ts ([437378d](https://github.com/fernandopasik/generator-startmeup/commit/437378d44370610da37d8576a9771da32f8d03a5))

### [0.13.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.13.0...v0.13.1) (2019-08-26)

### Bug Fixes

- typo ([6b060c9](https://github.com/fernandopasik/generator-startmeup/commit/6b060c964fb018e5ecac31566d68e307722635be))

### Code Refactoring

- compilers sub gen ([ae5f241](https://github.com/fernandopasik/generator-startmeup/commit/ae5f241b176e7681690c88bb63c233bacc448c1f))

### Miscellaneous Chores

- update dependencies ([3e23858](https://github.com/fernandopasik/generator-startmeup/commit/3e2385890c72de6321fe83d72f8d070b37d5c5fc))
- update dependencies ([18400b9](https://github.com/fernandopasik/generator-startmeup/commit/18400b9257d1342ac34aeb2d219f860dbe09aad0))

## [0.13.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.12.1...v0.13.0) (2019-07-23)

### Features

- add dependencies from package.json import ([5de22b1](https://github.com/fernandopasik/generator-startmeup/commit/5de22b1a17ae37a882b6893de628b91f058bad7a))
- new dependencies in ts ([a94d3c1](https://github.com/fernandopasik/generator-startmeup/commit/a94d3c1262dc3f2fd6d69f371ed9ae53bbdf14eb))
- src folder and index generator ([18ec141](https://github.com/fernandopasik/generator-startmeup/commit/18ec1416d2ae5d523c1e9cf9fd55a4772b431a85))

### Bug Fixes

- also take coverage of js files ([539ea94](https://github.com/fernandopasik/generator-startmeup/commit/539ea94e53c0e71f55794ce5c464cc359e838f49))
- commit precommit for ts ([ae6cd89](https://github.com/fernandopasik/generator-startmeup/commit/ae6cd899361a82df126e3012384040f822a33c04))
- take coverage from src ([5ed8ff7](https://github.com/fernandopasik/generator-startmeup/commit/5ed8ff7af8aafba16b5684b23a7641c18b051796))

### Tests

- add missing test for questions ([149fe65](https://github.com/fernandopasik/generator-startmeup/commit/149fe65ac20867b4c573698c8636223c316031b0))
- refactor dependencies methods check ([a920657](https://github.com/fernandopasik/generator-startmeup/commit/a92065795df534cc32b6da71f64116bbf4e43435))

### Code Refactoring

- import shortcut for ask module ([fac0098](https://github.com/fernandopasik/generator-startmeup/commit/fac009847299e823357bf305b25732a23bb02261))
- import shortcut for ask module ([cef1511](https://github.com/fernandopasik/generator-startmeup/commit/cef1511f7926cef8fcefe49c87f2f64ba467a995))
- libraries sub gen ([e99850b](https://github.com/fernandopasik/generator-startmeup/commit/e99850b7d2eb3a4fc2970a10ecee277c51711418))
- move file ([267b1ba](https://github.com/fernandopasik/generator-startmeup/commit/267b1ba7c9887dbde8d5b299e453bb46b3b22949))
- rename types ([c508edf](https://github.com/fernandopasik/generator-startmeup/commit/c508edf8ed7ff629f1cdbcb359d5f02f221da8b4))

### Miscellaneous Chores

- run prettier on readme ([e2c3606](https://github.com/fernandopasik/generator-startmeup/commit/e2c3606a3e0fe90b4ce01d7a377f0a0c87f60a87))
- update dependencies ([1c4cb6a](https://github.com/fernandopasik/generator-startmeup/commit/1c4cb6aeddf3afe5c8894407c89506ef55ab1f57))

### [0.12.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.12.0...v0.12.1) (2019-07-20)

### Bug Fixes

- flatten answers before sending to memory ([b6cbd43](https://github.com/fernandopasik/generator-startmeup/commit/b6cbd43094dd95b820e5ec8e724a5da07a6dd7b4))

## [0.12.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.11.0...v0.12.0) (2019-07-20)

### Features

- answers functions ([735c4a4](https://github.com/fernandopasik/generator-startmeup/commit/735c4a4acb3591083475253c6d241135a8790779))
- get question names ([c097cf6](https://github.com/fernandopasik/generator-startmeup/commit/c097cf6390af50e35efd0752c158cb9e4e5530bf))
- memory in answers ([ca3f42a](https://github.com/fernandopasik/generator-startmeup/commit/ca3f42aa8baea67a3f02be2ee2b2b6f393b9740c))
- question functions ([da111e0](https://github.com/fernandopasik/generator-startmeup/commit/da111e0df927c4982f637c54a867d9676ea74386))

### Bug Fixes

- deprecate packagejson file ([26bd0f1](https://github.com/fernandopasik/generator-startmeup/commit/26bd0f158d6fe3449513eefa9c27f085d9a6033b))
- lint errors ([1a33ab9](https://github.com/fernandopasik/generator-startmeup/commit/1a33ab964751a4b0b5234f6f199cdea93ef5e30e))
- lint errors ([45c788c](https://github.com/fernandopasik/generator-startmeup/commit/45c788c75f36d54c0244291bd2e94be76ae62f98))
- lint errors ([e492d4a](https://github.com/fernandopasik/generator-startmeup/commit/e492d4a6be8cd78a937ab521e16432ea3f52c229))
- lint errors ([2ebd3a5](https://github.com/fernandopasik/generator-startmeup/commit/2ebd3a5df01162c4779116981324c62f8ef1b55c))
- lint errors ([fe338a1](https://github.com/fernandopasik/generator-startmeup/commit/fe338a1a39cddacb638006c0373c8eeb08179f08))
- lint warnings ([1ee2bf2](https://github.com/fernandopasik/generator-startmeup/commit/1ee2bf28a0df9847d5b27fab3bcfa7a341a101b6))
- make nested questions ([12f05b8](https://github.com/fernandopasik/generator-startmeup/commit/12f05b80ba0f1978599dd444df838b60cec3af7a))
- output commonjs modules for node ([ee8b5e6](https://github.com/fernandopasik/generator-startmeup/commit/ee8b5e6cae1704d6a80aaca9935bbae977934a36))
- packagejson types ([14fa69f](https://github.com/fernandopasik/generator-startmeup/commit/14fa69f6088da27ffffafffeba5269cfc306be69))
- pettier all files ([5ee6e0b](https://github.com/fernandopasik/generator-startmeup/commit/5ee6e0b8c160e9fc15b7d3a4d2422726c9fd5c2e))
- type error ([127735d](https://github.com/fernandopasik/generator-startmeup/commit/127735da99de3c50aefe2f271b51e88a9136f285))
- type import ([c4afa7e](https://github.com/fernandopasik/generator-startmeup/commit/c4afa7e74ff55f928b16d53494f0cb857649ed26))
- type import ([b738ff9](https://github.com/fernandopasik/generator-startmeup/commit/b738ff9044c284769818f68c7201dec2f2220e21))
- typo ([d21bce9](https://github.com/fernandopasik/generator-startmeup/commit/d21bce9a2d25610294ca088bc446a53a29eef935))

### Tests

- refactor spies on tests ([7656ff1](https://github.com/fernandopasik/generator-startmeup/commit/7656ff1a899d434ae30617b0b81e54424ba97524))

### Miscellaneous Chores

- add types for yosay ([107e927](https://github.com/fernandopasik/generator-startmeup/commit/107e92737d305954abef35801bc3c8243a20471e))
- configure eslint for ts files ([074d353](https://github.com/fernandopasik/generator-startmeup/commit/074d353cb1c458e7914eef77d41335d5ec7839a9))
- install prettier and fix files ([2f2307a](https://github.com/fernandopasik/generator-startmeup/commit/2f2307ab7acedec5b3cb367adda0e82c58029945))
- setup test run with ts ([3a2d5d2](https://github.com/fernandopasik/generator-startmeup/commit/3a2d5d2bbed51f86b5722cec9863b3b18c4a970a))
- update dependencies ([015ec1e](https://github.com/fernandopasik/generator-startmeup/commit/015ec1e09a25bb573a326357b8c7bd2e59cc904f))
- update dependencies ([3b3eced](https://github.com/fernandopasik/generator-startmeup/commit/3b3eced702bdf40e3cbe0ffa7cbf28b48ecaf643))
- update dependencies ([4fa09b3](https://github.com/fernandopasik/generator-startmeup/commit/4fa09b390c532310c15ce1ff6d36dd80443f3687))
- update watch task ([0bcaf70](https://github.com/fernandopasik/generator-startmeup/commit/0bcaf7077adebb4c09555a1f75eca12ac3e36eb1))

### Code Refactoring

- ask module and extract questions for packagejson ([4c52d0b](https://github.com/fernandopasik/generator-startmeup/commit/4c52d0b059fc63ef1743ab5259d9924538733823))
- ask service ([84fdc6e](https://github.com/fernandopasik/generator-startmeup/commit/84fdc6e8745ab905ae40b1a89ff5b76495222a41))
- deprecate old files ([5e1336e](https://github.com/fernandopasik/generator-startmeup/commit/5e1336e35c3136863c2bbbd65e595d4c6f29ef61))
- deprecate old template ([277e2b2](https://github.com/fernandopasik/generator-startmeup/commit/277e2b27e6b697d29fa36d94552bf5431a6caeb6))
- migrate docs subgen to ts ([6736af3](https://github.com/fernandopasik/generator-startmeup/commit/6736af341b9235c25f5c36898f4e4fdf24429213))
- move stuff into typescript ([8fd08d4](https://github.com/fernandopasik/generator-startmeup/commit/8fd08d433f5f4711f0605fcfbc62b485a33387d2))
- package.json sub generator with typescript ([205d3bb](https://github.com/fernandopasik/generator-startmeup/commit/205d3bbe157a4130678b6150d5c81862b5f5fe43))
- rename github confirm question name ([d36cffd](https://github.com/fernandopasik/generator-startmeup/commit/d36cffda2114554a86aff52675ec5e93391b406b))
- rename questions for name and description ([43e6457](https://github.com/fernandopasik/generator-startmeup/commit/43e6457962ca8d3e6e6b2428a09b0d9b5451e7bc))
- tsconfig ([9c89ba7](https://github.com/fernandopasik/generator-startmeup/commit/9c89ba7a1c135329c9787b98b99c0dfd823e434b))
- use semicolons in class attribs ([833500c](https://github.com/fernandopasik/generator-startmeup/commit/833500c4529c27bd3373527341b491c520a404d6))
- use type from question ([d9f3de8](https://github.com/fernandopasik/generator-startmeup/commit/d9f3de839890e84728f205afddee128ee493e017))

## [0.11.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.10.1...v0.11.0) (2019-07-12)

### Features

- compiler sub generator ([9153df5](https://github.com/fernandopasik/generator-startmeup/commit/9153df5883209bc230ca08baf194a90ec2900374))

### Code Refactoring

- compiler sub generator ([fee8911](https://github.com/fernandopasik/generator-startmeup/commit/fee891181fafae299f133024995dabebe543fdad))
- deprecate compiler code from libraries ([3a58034](https://github.com/fernandopasik/generator-startmeup/commit/3a58034ae977f826b33ad3fbac3c3e7451c8dbe4))

### Miscellaneous Chores

- delete build folder before ([1e2bf8c](https://github.com/fernandopasik/generator-startmeup/commit/1e2bf8c8623fc4f26336ca91de280fe08cb327ce))
- update dependencies ([95883a9](https://github.com/fernandopasik/generator-startmeup/commit/95883a91ffbeba82317b7e87059c76bf87022b03))

### [0.10.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.10.0...v0.10.1) (2019-07-09)

### Features

- license question in package.json ([b5a775d](https://github.com/fernandopasik/generator-startmeup/commit/b5a775d5a515020775be712c16d10ab79cf6b6c9))

### Bug Fixes

- deprecate unused files ([a421530](https://github.com/fernandopasik/generator-startmeup/commit/a421530e96638ba7fc049fb432d7349b76d52469))
- package.json test ([2604594](https://github.com/fernandopasik/generator-startmeup/commit/260459449f62ab9c5c9eaeb03d06b659b6321b0c))

## [0.10.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.9.2...v0.10.0) (2019-07-09)

### Features

- package.json sub generator ([afb78ca](https://github.com/fernandopasik/generator-startmeup/commit/afb78cad3281b3463263f633d6eed8c3c1b288d0))

### Bug Fixes

- directly include github username lib ([c01784b](https://github.com/fernandopasik/generator-startmeup/commit/c01784b31c7f77c08fa9d878637f8a8488f7dc07))
- node export ([bc2ba57](https://github.com/fernandopasik/generator-startmeup/commit/bc2ba571420fe700f706e5a8f7077e7fd07ee8b8))
- use git utils directly from generator class ([4de9d22](https://github.com/fernandopasik/generator-startmeup/commit/4de9d22c5ec424454e44b468f3234d92ded79e73))

### Miscellaneous Chores

- configure prettier ([b60dde5](https://github.com/fernandopasik/generator-startmeup/commit/b60dde525cc91b28ee8350e39353408d749a6014))
- update dependencies ([6b283e8](https://github.com/fernandopasik/generator-startmeup/commit/6b283e8d9b58ed596a7c2e7fc77bb699c9c7b0cf))
- update dependencies ([ba58f18](https://github.com/fernandopasik/generator-startmeup/commit/ba58f18e655418c6c7436d7cba4c5ae0a3b05d16))

### Code Refactoring

- deprecate part of init and use package.json subgen ([a807fba](https://github.com/fernandopasik/generator-startmeup/commit/a807fba0a8354ec4e6ef336efb17e4a420cef677))
- extract questions in separate file ([52f53f1](https://github.com/fernandopasik/generator-startmeup/commit/52f53f178daf47b30f62a02ad599800dee8a90d9))
- reorder existing package.json with sub generator ([bb0bea5](https://github.com/fernandopasik/generator-startmeup/commit/bb0bea543ccc37c258ba5a4b3a6bfada9eee8faa))
- use directly inquirer.js ([f0935ef](https://github.com/fernandopasik/generator-startmeup/commit/f0935efbc0d9d5c3b1e52a77d8545a150c9fa49a))

### [0.9.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.9.1...v0.9.2) (2019-05-23)

### Code Refactoring

- deprecate Base class ([80463f3](https://github.com/fernandopasik/generator-startmeup/commit/80463f3e0a5e19eb5f097b1b2f7414b4e1b8b75a))
- do not extend from Base ([b1c100e](https://github.com/fernandopasik/generator-startmeup/commit/b1c100ed70502340025eac9ab4b24137d851572b))
- docs generator prompt questions ([eed4cef](https://github.com/fernandopasik/generator-startmeup/commit/eed4cefba3d392ad028a3182f7f102e3bc748ca1))
- info asking ([6f37185](https://github.com/fernandopasik/generator-startmeup/commit/6f371851ac0df35d940cc1114255258d15b8ac1b))
- init generator prompt questions ([1b59511](https://github.com/fernandopasik/generator-startmeup/commit/1b595115bca40f031740893fb2b8ad65becb5d2a))
- move format js to util file ([dd4eb57](https://github.com/fernandopasik/generator-startmeup/commit/dd4eb577ef3ab0c4017e45e0199b0f86165bd386))

### Miscellaneous Chores

- update dependencies ([ce7d050](https://github.com/fernandopasik/generator-startmeup/commit/ce7d0500b232736e7ec98b9be9e4a79ccf56e1bd))

### [0.9.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.9.0...v0.9.1) (2019-05-20)

### Bug Fixes

- force github username package version ([16ce002](https://github.com/fernandopasik/generator-startmeup/commit/16ce002a9a80ddf7b7eb3dabaa4877b670a5a15b))

### Miscellaneous Chores

- update dependencies ([dc15439](https://github.com/fernandopasik/generator-startmeup/commit/dc15439cd1d0b433898fa9bf445a45068165fd8f))

## [0.9.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.8.0...v0.9.0) (2019-05-18)

### Bug Fixes

- compose happens in initialization fase ([9275998](https://github.com/fernandopasik/generator-startmeup/commit/92759984febfd18bdf693e2130b2817933ff6b49))
- dependencies shared across sub generators ([30db195](https://github.com/fernandopasik/generator-startmeup/commit/30db19520a3ad635576deab08d46c947157a3b3d))
- detect react for lint staged ([bf30a75](https://github.com/fernandopasik/generator-startmeup/commit/bf30a75df54fb7abdca3c21b50141334eee5a6cb))
- ignore all node_modules folders for mono repos ([b505405](https://github.com/fernandopasik/generator-startmeup/commit/b505405b1901ab97c5b3a727693cd910c7522792))
- only config react if present ([31d2751](https://github.com/fernandopasik/generator-startmeup/commit/31d27519dbf969af4ca6d6ff036412eca723c084))
- separate writing from prompting ([629f4ac](https://github.com/fernandopasik/generator-startmeup/commit/629f4ac99aa1b80fdf3da13613f36c8ae117dc92))

### Code Refactoring

- config react ([a5f5460](https://github.com/fernandopasik/generator-startmeup/commit/a5f5460aad56f5e50a81684577d537248cd1210c))
- init only sets package.json ([b76f475](https://github.com/fernandopasik/generator-startmeup/commit/b76f475646e2ae96edf3741c3b63c02c745e1939))
- read package json in sub generator ([52c612e](https://github.com/fernandopasik/generator-startmeup/commit/52c612e3fa071408e9005012025bd099fd29a7dd))
- remove deprecated dependency management code ([2624fa7](https://github.com/fernandopasik/generator-startmeup/commit/2624fa7b5961df49b73dd369ed7dc7497baef0af))
- short the checks with destruct ([1b7941c](https://github.com/fernandopasik/generator-startmeup/commit/1b7941cea17bef855e4a0a976a22b185f2a05899))
- typescript config location ([37ca327](https://github.com/fernandopasik/generator-startmeup/commit/37ca3277eae972abec4df16127fac81e6a41336e))

### Miscellaneous Chores

- update dependencies ([1dafe10](https://github.com/fernandopasik/generator-startmeup/commit/1dafe1029c93d65d5667bbb2c3bb87972785151a))

## [0.8.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.7.0...v0.8.0) (2019-03-16)

### Features

- compose all sub generators ([62c9ba5](https://github.com/fernandopasik/generator-startmeup/commit/62c9ba521c1ac5297eef8d2be9f4ea68ebf41a8d))
- contributing guide in docs sub generator ([3e2a1af](https://github.com/fernandopasik/generator-startmeup/commit/3e2a1af1911073e90cfe78bd8128dfd72a479207))
- fill new templates in docs sub generator ([60a4bbe](https://github.com/fernandopasik/generator-startmeup/commit/60a4bbecd5d289563f734038490e3533e0705c5a))
- libraries sub generator ([caed8c3](https://github.com/fernandopasik/generator-startmeup/commit/caed8c37032c57a60da338d360bc23847da7a5cf))
- lint sub generator ([6fad358](https://github.com/fernandopasik/generator-startmeup/commit/6fad358de1c59dd6e4aa9c5f195b461d033e87c3))
- populate checks and styleguides in contributing guide ([b5c89c7](https://github.com/fernandopasik/generator-startmeup/commit/b5c89c7d2336ffab45d366aa7785425b9f530d0e))
- setup src folder ([c1ae16f](https://github.com/fernandopasik/generator-startmeup/commit/c1ae16fdf72aca590f5b6d153c34e1e6afe7e289))
- test config sub generator ([b9882b8](https://github.com/fernandopasik/generator-startmeup/commit/b9882b8c259049283b8b04fcb3dd1e5bb4e724fd))

### Bug Fixes

- copy eslint ignore file in lint sub generator ([9e979a4](https://github.com/fernandopasik/generator-startmeup/commit/9e979a4312dade2e9d16f73afc69b0ef06c7df5f))
- current eslint config empty crash ([9fb60d2](https://github.com/fernandopasik/generator-startmeup/commit/9fb60d243540f70eb60a5ce8ca3ecca4839ed61a))
- delete deprecated files ([3ad2203](https://github.com/fernandopasik/generator-startmeup/commit/3ad2203ad21837011dce80a17e90c39f4a8f6f5c))
- missing eslint dependency on sub generator ([c4a70db](https://github.com/fernandopasik/generator-startmeup/commit/c4a70db42fa7c9fc63a63e33fa660931a411c5cc))
- path join instead of template ([cfca6f3](https://github.com/fernandopasik/generator-startmeup/commit/cfca6f3504ec07afdbf3fa19e07932129210c1a3))
- remove year option from init ([6ed620f](https://github.com/fernandopasik/generator-startmeup/commit/6ed620fa3015b8d51559fab5dfdb23f917120d04))
- use will install util when checking dependencies ([c8015d4](https://github.com/fernandopasik/generator-startmeup/commit/c8015d48f13f0f10e76d01a2aa85902d228f505e))

### Miscellaneous Chores

- update dependencies ([c10b183](https://github.com/fernandopasik/generator-startmeup/commit/c10b183530e4ee5d8208a2c1a812c008ee9ef3e7))
- update dependencies ([8b3a9cb](https://github.com/fernandopasik/generator-startmeup/commit/8b3a9cb87d4354a2e4f7925c5ee79e52a28e8bff))
- update dependencies ([26643a3](https://github.com/fernandopasik/generator-startmeup/commit/26643a3e68d14f724789346c00ce8a86ecc9856d))

### Code Refactoring

- improve base class ([a13a2f9](https://github.com/fernandopasik/generator-startmeup/commit/a13a2f9420124cf81055b2b82c75056ca516cbef))
- move license and readme to docs sub generator ([659dfa4](https://github.com/fernandopasik/generator-startmeup/commit/659dfa4907df5c0456791f70a2ad2dd59bc0576f))
- move to base prompt fields ([a14d1ab](https://github.com/fernandopasik/generator-startmeup/commit/a14d1ab4a1ae519c3ef1f881e59b255489e3fffb))
- rename dev dependencies property in generator ([29b8266](https://github.com/fernandopasik/generator-startmeup/commit/29b826627bf769b32b27a51171f311b3467cd593))
- rename repo sub generator to docs ([6e26d93](https://github.com/fernandopasik/generator-startmeup/commit/6e26d93ca12e7bd2d4186d1beb44d07b7622f04c))
- setup typescript ([41a02d8](https://github.com/fernandopasik/generator-startmeup/commit/41a02d8695b679f8b5389abbe943c3033756b2d6))
- short the checks with destruct ([bf09d45](https://github.com/fernandopasik/generator-startmeup/commit/bf09d459dc08ff8610e478fd440ad2177b593085))

## [0.7.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.6.1...v0.7.0) (2019-03-06)

### Features

- add formats to lint staged config ([a2ec0fa](https://github.com/fernandopasik/generator-startmeup/commit/a2ec0fa7f911b6cba4ddc419bdf1eebc82b0705c))
- create a base class ([18956a6](https://github.com/fernandopasik/generator-startmeup/commit/18956a6b9fa4784f257877e06f349729e6d3f898))
- hooks sub generator ([87d8358](https://github.com/fernandopasik/generator-startmeup/commit/87d8358873bfccbd7f36ebec82a566b07930e921))
- quick implementation for hooks and more ([f8ef583](https://github.com/fernandopasik/generator-startmeup/commit/f8ef5838e6bc9ba4ecacb9c7d3a9d04bca260b77))

### Bug Fixes

- add extension to lint staged config ([a4155c2](https://github.com/fernandopasik/generator-startmeup/commit/a4155c246554e939c9a295d07e5ebd124e867e18))
- lint staged extensions ([2c8ee23](https://github.com/fernandopasik/generator-startmeup/commit/2c8ee23d995ecab92a512df6f94643aa5a598d5f))

### Miscellaneous Chores

- update dependencies ([4466a44](https://github.com/fernandopasik/generator-startmeup/commit/4466a44a20869ed36e5a1bb3ea914a80fbcaf94b))

### [0.6.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.6.0...v0.6.1) (2019-03-05)

### Features

- add yarn error to ignore files ([6462a95](https://github.com/fernandopasik/generator-startmeup/commit/6462a953fbc57fb15af5ea25fb37e4e53dab61ca))
- sub generator for issue templates and docs ([55d50f9](https://github.com/fernandopasik/generator-startmeup/commit/55d50f902ffe5630cd6aeeccd6cbe2073cdebea4))

### Bug Fixes

- npmignore should not ignore dist folder ([893f65a](https://github.com/fernandopasik/generator-startmeup/commit/893f65a4d80309d8c273ed0024edb7318ecff0c4))
- readme badges ([0c0e2b0](https://github.com/fernandopasik/generator-startmeup/commit/0c0e2b0bd9dfeeb12722310d78ac2f017e2a6ac3))
- readme badges ([750e717](https://github.com/fernandopasik/generator-startmeup/commit/750e7174ab8cf6d5fbe486916d91450ae3de9c8f))
- remove deprecated bower template ([dbfd7a4](https://github.com/fernandopasik/generator-startmeup/commit/dbfd7a4e0f9d36afd57646ecc34ded6a8a6faeb1))
- remove engines from package.json template ([b0d2aa0](https://github.com/fernandopasik/generator-startmeup/commit/b0d2aa0287b10bcf78a029b41b5116613bc76f15))
- remove engines in package.json ([3034616](https://github.com/fernandopasik/generator-startmeup/commit/303461618a253044824aa062d4b8f8d6113befca))
- remove sass cache from ignore ([cd500d7](https://github.com/fernandopasik/generator-startmeup/commit/cd500d7ba6bc219e1fe876285112ed8b1357b2f5))
- remove testing tools dependencies ([f354050](https://github.com/fernandopasik/generator-startmeup/commit/f354050ac79db6cb362a9d888422ac7ce12a82bf))

### Code Refactoring

- move init to sub generator ([bb4e07d](https://github.com/fernandopasik/generator-startmeup/commit/bb4e07d21c80e9c09777cb85d70d9e7f7245b4fb))

### Miscellaneous Chores

- add github templates ([3c59fae](https://github.com/fernandopasik/generator-startmeup/commit/3c59fae867474d335d90cf212542a7803dda0ecb))
- add jest ([a7497ce](https://github.com/fernandopasik/generator-startmeup/commit/a7497ce87d134941dde4dae1afd1ce72f1009682))
- add jest unit reporter ([c01ae40](https://github.com/fernandopasik/generator-startmeup/commit/c01ae409deaf2aa0a14b41afe9a20a5dae66be56))
- git hooks ([599daa0](https://github.com/fernandopasik/generator-startmeup/commit/599daa0909049fb147faf1192c1b14e1e0e3907d))
- remove coveralls ([4e390d2](https://github.com/fernandopasik/generator-startmeup/commit/4e390d2169d021a55b11b4bec583caf8cf31b906))
- remove testing tools ([307dfc5](https://github.com/fernandopasik/generator-startmeup/commit/307dfc50dc2dc045d23b26e17c0681dc212f1750))
- remove travis ([603b1a7](https://github.com/fernandopasik/generator-startmeup/commit/603b1a7f409b57cd6aa0cb443f9c96ec17059b9c))
- rename eslint config ([4f69da0](https://github.com/fernandopasik/generator-startmeup/commit/4f69da074e278e00f43e8aec93598cddd3d97b67))
- send coverage to codecov ([36f4b52](https://github.com/fernandopasik/generator-startmeup/commit/36f4b529e6d1e4cb6309e7134f507f8f37f16db1))
- setup circleci ([14bef84](https://github.com/fernandopasik/generator-startmeup/commit/14bef84940a919e4ad6cfd37e5795e9d297238e0))
- update yarn lock ([c7438a2](https://github.com/fernandopasik/generator-startmeup/commit/c7438a26e225d2561ae25abe0a3aebab5305de7f))
- update yeoman ([0f52950](https://github.com/fernandopasik/generator-startmeup/commit/0f52950f1f5a3998265469c10ee8bd50a9130edd))

### Tests

- add jest config ([c843e8b](https://github.com/fernandopasik/generator-startmeup/commit/c843e8b0e2087d8234c07b57a5d0f34e0c639962))
- non predictable app name in ci ([bb4d5c4](https://github.com/fernandopasik/generator-startmeup/commit/bb4d5c4d73fd4c928be2455b99591bf07fa84d5d))

### Documentation

- add code of conduct ([e4362c3](https://github.com/fernandopasik/generator-startmeup/commit/e4362c37fc54397dbd8733fc988f630a58a91a1f))
- add contributing guidelines ([b39a396](https://github.com/fernandopasik/generator-startmeup/commit/b39a39648952998f9558b0f804e3c18fbfe4f037))

## [0.6.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.12...v0.6.0) (2019-03-03)

### Bug Fixes

- remove deprecated config ([96a9c4f](https://github.com/fernandopasik/generator-startmeup/commit/96a9c4f8f76141d792c2b0673f20dc0f3a8fdcf3))

### Code Refactoring

- remove bower ([9c8eb6d](https://github.com/fernandopasik/generator-startmeup/commit/9c8eb6d8b0a59c7e24ec1a44f1794320e7929b4c))

### Miscellaneous Chores

- update dev dependencies ([efe218b](https://github.com/fernandopasik/generator-startmeup/commit/efe218bf9fef82ab3a80d9c3a4c4ed336d126491))
- update dev dependencies ([b605f75](https://github.com/fernandopasik/generator-startmeup/commit/b605f75a0271d444aeeaaeb4e4a202b92f602741))
- update lint rules and fix errors ([d166453](https://github.com/fernandopasik/generator-startmeup/commit/d166453a5da2d66e08d4c660e989dac2ce08ba84))
- update yosay dependency ([412e5b9](https://github.com/fernandopasik/generator-startmeup/commit/412e5b9a96a64690dea1ebf71af465e4270612b5))
- use yarn ([3865f9b](https://github.com/fernandopasik/generator-startmeup/commit/3865f9bf8cd356c7edb7738c3354ccf83658e01d))

### [0.5.12](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.11...v0.5.12) (2016-12-01)

### Miscellaneous Chores

- Update badges in README ([0dbc0c1](https://github.com/fernandopasik/generator-startmeup/commit/0dbc0c1dfbf0773c5a70ec00b935fd826b0a3360))
- Update dependencies ([a028923](https://github.com/fernandopasik/generator-startmeup/commit/a0289231e644550b7c969c8064982a47617eb4ad))

### [0.5.11](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.10...v0.5.11) (2016-11-13)

### Miscellaneous Chores

- Update dependencies ([2de8f76](https://github.com/fernandopasik/generator-startmeup/commit/2de8f76ac8a967b5bda99be718b64add0a759a3c))
- Update dotfiles ([f9952fd](https://github.com/fernandopasik/generator-startmeup/commit/f9952fd97e61006053cba0b77883684cab845f40))
- Update lint and fix errors ([d29e9f2](https://github.com/fernandopasik/generator-startmeup/commit/d29e9f2f2e3c25ec454eaa82bbfc3e8c106daac6))
- Update tasks and dependencies ([dd36e71](https://github.com/fernandopasik/generator-startmeup/commit/dd36e7182a209f42fd5ac196bd7c7e3da81ef439))

### [0.5.10](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.8...v0.5.10) (2016-06-18)

### [0.5.8](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.7...v0.5.8) (2016-05-30)

### [0.5.7](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.6...v0.5.7) (2016-05-30)

### [0.5.6](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.5...v0.5.6) (2016-05-13)

### [0.5.5](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.4...v0.5.5) (2016-05-11)

### [0.5.4](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.3...v0.5.4) (2016-05-07)

### [0.5.3](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.2...v0.5.3) (2016-05-07)

### [0.5.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.1...v0.5.2) (2016-05-05)

### [0.5.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.5.0...v0.5.1) (2016-05-05)

## [0.5.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.4.2...v0.5.0) (2016-04-25)

### [0.4.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.4.1...v0.4.2) (2016-04-24)

### [0.4.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.4.0...v0.4.1) (2016-04-19)

## [0.4.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.3.2...v0.4.0) (2016-04-18)

### [0.3.2](https://github.com/fernandopasik/generator-startmeup/compare/v0.3.1...v0.3.2) (2016-04-15)

### [0.3.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.3.0...v0.3.1) (2016-04-11)

## [0.3.0](https://github.com/fernandopasik/generator-startmeup/compare/v0.2.1...v0.3.0) (2016-04-11)

### [0.2.1](https://github.com/fernandopasik/generator-startmeup/compare/v0.2.0...v0.2.1) (2016-01-17)

## 0.2.0 (2016-01-17)
