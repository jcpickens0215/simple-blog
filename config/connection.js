// Import sequelize and dotenv
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If running on Heroku
if (process.env.JAWSDB_URL) {

  // Configure sequelize for Heroku
  sequelize = new Sequelize(process.env.JAWSDB_URL);

// If not running on Heroku
} else {

  // Configure normally
  sequelize = new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
