module.exports.formatJsConfig = (configObj) => {
  const configStr = JSON
    .stringify(
      configObj,
      (key, value) => {
        if (value instanceof Array) {
          return JSON.stringify(value, (k, v) => {
            if (typeof v === 'string') {
              return `'${v}'`;
            }
            return v;
          });
        }

        if (typeof value === 'string') {
          return `'${value}'`;
        }

        return value;
      },
      2,
    )
    .replace(/\\"/g, '"')
    .replace(/("'|'")/g, '\'')
    .replace(/"\[/g, '[')
    .replace(/\]"/g, ']')
    .replace(/"([\w]*)"/g, '$1')
    .replace(/(\s)"(.*)":/, '$1\'$2\':')
    .replace(/','/g, '\', \'')
    .replace(/'\n/, '\',\n')
    .replace(/]\n/, '],\n')
    .replace(/}\n/, '},\n');

  return `module.exports = ${configStr};\n`;
};
