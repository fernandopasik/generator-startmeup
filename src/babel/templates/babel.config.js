/// <% if (module) { %>
export default {
  // <% } else { %>module.exports = {<% } %>
  presets: [
    '@babel/preset-env',
    // <% if (react) { %>
    '@babel/preset-react',
    // <% } %>
    // <% if (typescript) { %>
    '@babel/preset-typescript',
    // <% } %>
  ],
  plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
};
