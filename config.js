const config = {};
if (process.env.NODE_ENV === 'development') {
  const devConfig = require('./devConfig.js');
  config.mongoURL = devConfig.mongoURL;
  config.port = devConfig.port;
  config.secretKey = devConfig.secretKey;
} else {
  config.mongoURL = process.env.MONGO_URL;
  config.port = process.env.PORT;
  config.secretKey = process.env.SECRET_KEY;
}

module.exports = config;
