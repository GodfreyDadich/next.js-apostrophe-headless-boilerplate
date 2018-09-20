const webpack = require('webpack')

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        API_DOMAIN: 'http://localhost:3000/', 
        JWT_SECRET: 'XXXXX'
      })
    )
    return config
  }
}
