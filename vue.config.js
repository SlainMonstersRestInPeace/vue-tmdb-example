const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/index.js',
      template: 'src/template/index.pug',
      filename: 'index.html'
    }
  },

  devServer: {
    historyApiFallback: true,
  },

  configureWebpack: config => {
    config.devtool = 'eval-source-map'
    config.output.devtoolModuleFilenameTemplate = info => {
      let resPath = path.normalize(info.resourcePath)
      let isVue = resPath.match(/\.vue$/)
      let isGenerated = info.allLoaders

      let generated = `webpack-generated:///${resPath}?${info.hash}`
      let vuesource = `sources://${info.resourcePath}`

      return isVue && isGenerated ? generated : vuesource
    }

    config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]';
  },
}
