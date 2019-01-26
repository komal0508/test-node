const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const Salary = db.define('salary', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    emp_id: {
        type: Sequelize.INTEGER,
    },
    month: {
        type: Sequelize.INTEGER,
    },
    year: {
        type: Sequelize.INTEGER,
    },
    salary: {
        type: Sequelize.DOUBLE,
    },
  });

  module.exports = Salary;