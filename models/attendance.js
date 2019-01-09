const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const Attendance = db.define('attendance', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    emp_id: {
        type: Sequelize.STRING,
    },
    // name: {
    //     type: Sequelize.STRING,
    // },
    factory_name: {
        type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    punch_in: {
        type: Sequelize.DATE,
    },
    punch_out: {
        type: Sequelize.DATE,
    },
    time_mill: {
        type: Sequelize.BIGINT,
    },
    total_time: {
        type: Sequelize.STRING,
    },
    is_break_time: {
        type: Sequelize.BOOLEAN,
    },
    is_office_work: {
        type: Sequelize.BOOLEAN,
    }
  });

  module.exports = Attendance;