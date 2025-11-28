module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Remove the plugins array if you don't have other plugins
    // plugins: [
    //   "@babel/plugin-transform-modules-commonjs" 
    // ],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      }
    }
  };
};