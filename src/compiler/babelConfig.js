const presets = new Set();

module.exports.addPreset = preset => presets.add(preset);
module.exports.getPresets = () => Array.from(presets);

module.exports.formatFile = () => {
  const presetList = Array.from(presets)
    .map(preset => `    '${preset}',`)
    .join('\n');
  return `module.exports = {
    presets: [
  ${presetList}
    ],
  };
  `;
};
