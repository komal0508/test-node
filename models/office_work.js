const Sequelize = require('sequelize'); // Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const db = require('../config/db');


const OfficeWork = db.define('office_work', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    },
    attendence_id: {
        type: Sequelize.INTEGER,
    },
    purpose: {
        type: Sequelize.STRING,
    },
    comment: {
        type: Sequelize.STRING,
    },
    is_accepted: {
        type: Sequelize.BOOLEAN,
    }
  });

  module.exports = OfficeWork;