const babelJest = require("babel-jest");

const babelOptions = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ]
};
module.exports = babelJest.createTransformer(babelOptions);
