// eslint-disable-next-line import/no-extraneous-dependencies
const withAntdLess = require('next-plugin-antd-less');

module.exports = {
  ...withAntdLess({
    cssModules: true,
    cssLoaderOptions: {
      modules: {
        localIdentName: '[local]___[hash:base64:5]',
        compileType: 'module',
      },
    },

    // modifyVars: themeVariables, // make your antd custom effective

    // webpack: (nextConfig) => {
    //   nextConfig.plugins.push(new EnvironmentPlugin(environment));
    //   return nextConfig;
    // },
    // future: {
    //   webpack5: true,
    // },
  }),
};
