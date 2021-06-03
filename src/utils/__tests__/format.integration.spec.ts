import format from '../format';

describe('format (integration)', () => {
  it('empty files', async () => {
    const result = await format('', 'example.js', '/');

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('json files', async () => {
    const content = `
{
  //
  "foo3": "bar3",
  "foo": "bar",
  "foo2": [
    3, 0, 1
  ]
}
`;
    const result = await format(content, 'example.json', '/');

    expect(result).toMatchInlineSnapshot(`
"{ \\"foo\\": \\"bar\\", \\"foo2\\": [0, 1, 3], \\"foo3\\": \\"bar3\\" }
"
`);
  });

  it('js file', async () => {
    const content = `
/// module.exports = {
  //
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{j,t}s'],

};
`;
    const result = await format(content, 'example.js', '/');

    expect(result).toMatchInlineSnapshot(`
"module.exports = {
  testEnvironment: \\"node\\",
  collectCoverageFrom: [\\"src/**/*.{j,t}s\\"],
};
"
`);
  });

  it('eslint config', async () => {
    const content = `
{
  "extends": [
    /// "prettier",
    "airbnb-base",
    "plugin:jest/all",
  ],
  "rules": {
    "max-lines": [{"skipComments": true,
      "max": 130,
      "skipBlankLines": true
    },"error"],
    "jest/no-hooks": "off",
    "import/extensions": ["never", "error"],
    "@typescript-eslint/no-magic-numbers": ["error", { "ignore": [1,0] }],
  },
  "parserOptions": { "project": "./tsconfig.all.json" },
  "overrides": [
    //
    { "files": ["*.stories.*"], "rules": {} },
    //
    { "files": ["*.spec.*"], "rules": {} }
    //
  ]
}
`;
    const result = await format(content, 'example.json', '/');

    expect(result).toMatchInlineSnapshot(`
"{
  \\"extends\\": [\\"airbnb-base\\", \\"plugin:jest/all\\", \\"prettier\\"],
  \\"overrides\\": [
    { \\"files\\": [\\"*.spec.*\\"], \\"rules\\": {} },
    { \\"files\\": [\\"*.stories.*\\"], \\"rules\\": {} }
  ],
  \\"parserOptions\\": { \\"project\\": \\"./tsconfig.all.json\\" },
  \\"rules\\": {
    \\"@typescript-eslint/no-magic-numbers\\": [\\"error\\", { \\"ignore\\": [0, 1] }],
    \\"import/extensions\\": [\\"error\\", \\"never\\"],
    \\"jest/no-hooks\\": \\"off\\",
    \\"max-lines\\": [
      \\"error\\",
      { \\"max\\": 130, \\"skipBlankLines\\": true, \\"skipComments\\": true }
    ]
  }
}
"
`);
  });
});
