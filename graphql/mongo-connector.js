const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/snowservationdb';

module.exports = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db('snowservationdb');
  return {
    Records: db.collection('box'),
  };
};
