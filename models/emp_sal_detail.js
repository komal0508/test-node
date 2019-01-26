const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const EmpSalDetails = db.define('emp_sal_detail', {
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
        overtime_seconds: {
            type: Sequelize.BIGINT,
        },
        overtime_salary: {
            type: Sequelize.DOUBLE,
        },
        total_seconds: {
            type: Sequelize.BIGINT,
        },
        
        total_salary: {
            type: Sequelize.DOUBLE,
        },
        punch_array:{
            type: Sequelize.ARRAY(Sequelize.JSON),
        }
  });

  module.exports = EmpSalDetails;