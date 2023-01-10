const db = require('../models');

const configureDatabaseConnection = async () => {
  console.log('Checking database connection...');
  try {
    await db.sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = configureDatabaseConnection;
