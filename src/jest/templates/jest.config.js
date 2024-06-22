/// <% if (module) { %>
// <% if (puppeteer) { %>
// eslint-disable-next-line camelcase, n/no-process-env
const { npm_lifecycle_event } = process.env;

// <% } %>
export default {
  // <% } else { %>module.exports = {<% } %>
  collectCoverageFrom: ['src/**/*.<%= collectExtensions %>'],
  // <% if (storybook || puppeteer) { %>
  coveragePathIgnorePatterns: [
    '(<% if (puppeteer) { %>e2e|<% } %>stories)\\.[jt]sx?$',
    '/__stories__/',
    '/node_modules/',
  ],
  // <% } %>
  // <% if (typescript) { %>
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  // <% } %>
  // <% if (axe) { %>
  setupFilesAfterEnv: [
    // <% if (axe) { %>
    'jest-axe/extend-expect',
    // <% } %>
  ],
  // <% } %>
  testEnvironment: '<% if (lit) { %>jsdom<% } else { %>node<% } %>',
  // <% if (transform) { %>
  transform: { '^.+\\.<%= transformExtensions %>$': '<%= transform %>' },
  // <% } %>
  // <% if (lit) { %>
  transformIgnorePatterns: [
    '/node_modules/(?!(@lit|lit|lit-html|lit-element|webcomponents|@open-wc)/).*/',
  ],
  // <% } %>
  // <% if (puppeteer) { %>
  // eslint-disable-next-line camelcase
  ...(npm_lifecycle_event === 'test:e2e'
    ? {
        preset: 'jest-puppeteer',
        testEnvironment: 'jest-environment-puppeteer',
        testMatch: ['**/?(*.)+(e2e).[jt]s?(x)'],
        // <% if (typescript) { %>
        transform: { '^.+\\.[j|t]s$': 'ts-jest' },
        // <% } %>
      }
    : {}),
  // <% } %>
};
