const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("nativewind/babel"),
  };
  config.resolver = {
    ...resolver,
    sourceExts: [...resolver.sourceExts, "cjs", "ts", "tsx"], // Add TypeScript extensions here
  };

  return config;
})();
