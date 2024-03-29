const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    username: 'root',
    password: null,
    database: 'bina',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'bina',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT,
  },
};

module.exports = config;
