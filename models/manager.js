const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const Managers = db.define('managers', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    factory_name: {
        type: Sequelize.STRING,
    }
  });

  module.exports = Managers;