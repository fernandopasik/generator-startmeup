const devDependencies = [];
const dependencies = [];

module.exports.add = (names) => {
  dependencies.push(...names);
};

module.exports.addDev = (names) => {
  devDependencies.push(...names);
};

module.exports.get = () => dependencies;
module.exports.getDev = () => devDependencies;

module.exports.has = name => dependencies.includes(name) || devDependencies.includes(name);
