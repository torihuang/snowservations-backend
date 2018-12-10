const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const serverConfig = require('./config.js');

// Initialize the Express App
const app = new Express();
const cors = require('cors');

// Make Mongoose use usePushEach because Mongo version > 3.5 does not support pushAll https://github.com/Automattic/mongoose/issues/5924
mongoose.plugin(schema => { schema.options.usePushEach = true; });

// GraphQL requirements
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');
const connectMongo = require('./graphql/mongo-connector');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;
// MongoDB Connection

mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

app.set('secretKey', serverConfig.secretKey);

const start = async () => {
  const mongo = await connectMongo();

  app.use('/graphql*', cors(), (req, res, next) => {
    // return next();
    const HEADER_REGEX = /Bearer\s{1}(.*)$/;
    const authorization = req.headers.authorization;
    let token = '';
    if (authorization && HEADER_REGEX.test(authorization)) {
      token = HEADER_REGEX.exec(authorization)[1];
    }
    // If token exists, add user to req
    if (token) {
      const secretKey = serverConfig.secretKey;
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          // throw new Error('Failed to authenticate token.');
          req.isTokenInvalid = true;
          return next();
        } else {
          // if everything is good, save to request for use in other routes
          req.user = user;
          return next();
        }
      });
    // Else move on
    } else {
      req.isTokenInvalid = true;
      return next();
    }
  });

  app.use('/graphql', bodyParser.json(), cors(), graphqlExpress((req) => ({
    context: { mongo, user: req.user, isTokenInvalid: req.isTokenInvalid },
    schema,
  })));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  // start app
  console.log("serverConfig", serverConfig)
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(`Server is running on port: ${serverConfig.port}!`); // eslint-disable-line
    }
  });
};

start();

module.exports = app;
