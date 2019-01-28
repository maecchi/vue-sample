module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 9443,
    disableHostCheck: true, // process.env.NODE_ENV === 'development'
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    useLocalIp: false,
  }
}