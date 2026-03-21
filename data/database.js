const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db(process.env.DB_NAME);
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};