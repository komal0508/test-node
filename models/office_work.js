const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const OfficeWork = db.define('office_work', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    emp_id: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    factory_name: {
        type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    punch_in: {
        type: Sequelize.DATE,
    },
    purpose: {
        type: Sequelize.STRING,
    },
    punch_out: {
        type: Sequelize.DATE,
    },
    time_mill: {
        type: Sequelize.BIGINT,
    },
    comment: {
        type: Sequelize.STRING,
    },
    is_accepted: {
        type: Sequelize.BOOLEAN,
    }
  });

  module.exports = OfficeWork;