module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Addon-Beans-Frontend/' : '/',
  outputDir: 'docs',
  transpileDependencies: ['vuetify'],
};
