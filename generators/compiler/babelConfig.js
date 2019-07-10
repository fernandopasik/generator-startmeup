const presets = new Set();

module.exports.addPreset = preset => presets.add(preset);
module.exports.getPresets = () => Array.from(presets);

module.exports.formatFile = () => `module.exports = {
  presets: [
${Array.from(presets).map(preset => `    '${preset}',`).join('\n')}
  ],
};
`;
