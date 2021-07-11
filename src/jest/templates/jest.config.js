/// <% if (module) { %>
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
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json' } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  // <% } %>
  // <% if (axe || enzyme) { %>
  setupFilesAfterEnv: [
    // <% if (enzyme) { %>
    'jest-enzyme',
    // <% } %>
    // <% if (axe) { %>
    'jest-axe/extend-expect',
    // <% } %>
  ],
  // <% } %>
  testEnvironment: '<% if (enzyme) { %>enzyme<% } else if (lit) { %>jsdom<% } else { %>node<% } %>',
  // <% if (transform) { %>
  transform: { '^.+\\.<%= transformExtensions %>$': '<%= transform %>' },
  // <% } %>
  // <% if (lit) { %>
  transformIgnorePatterns: [
    '/node_modules/(?!(@lit|lit|lit-html|lit-element|webcomponents|@open-wc)/).*/',
  ],
  // <% } %>
  // <% if (puppeteer) { %>
  ...(process.env.npm_lifecycle_event === 'test:e2e'
    ? {
        preset: 'jest-puppeteer',
        testEnvironment: 'jest-environment-puppeteer',
        testMatch: ['**/?(*.)+(e2e).[jt]s?(x)'],
      }
    : {}),
  // <% } %>
};
