/// <% if (module) { %>
export default {
  // <% } else { %>module.exports = {<% } %>
  plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
  presets: [
    '@babel/preset-env',
    // <% if (react) { %>
    '@babel/preset-react',
    // <% } %>
    // <% if (typescript) { %>
    '@babel/preset-typescript',
    // <% } %>
  ],
};
