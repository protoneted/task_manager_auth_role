module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Use this plugin to assist with module resolution issues in new Node versions
      "@babel/plugin-transform-modules-commonjs"
    ],
  };
};