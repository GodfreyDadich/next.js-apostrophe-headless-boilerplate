const webpack = require('webpack')

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        API_DOMAIN: process.env.API_DOMAIN,
        JWT_SECRET: 'XXXXX'
      })
    )
    return config
  }
}
