const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const Managers = db.define('managers', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    factory_name: {
        type: Sequelize.STRING,
    },
    contact: {
        type: Sequelize.STRING,
    },
    email_token: {
        type: Sequelize.STRING, // Type of column
      },
    token_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
     
  });

  module.exports = Managers;