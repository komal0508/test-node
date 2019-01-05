const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const Employee = db.define('employees', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    // name: {
    //     type: Sequelize.STRING,
    // },
    emp_id: {
        type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    contact: {
        type: Sequelize.STRING,
    },
    factory_name: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    category: {
     type: Sequelize.STRING,
    },
    shift_time: {
        type: Sequelize.BIGINT,
    },
    salary_value: {
        type: Sequelize.STRING,
    }
  });

  module.exports = Employee;