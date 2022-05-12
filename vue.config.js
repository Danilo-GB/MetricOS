module.exports = {
  runtimeCompiler: true,

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "MetricOS Dashboard";
      return args;
    });
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
      enableBridge: false,
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
