const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-factory-name-filter", (req, res, next) => {
    sequelize.query(`SELECT attendances.emp_id, attendances.date, attendances.punch_in, attendances.punch_out, attendances.is_office_work, attendances.total_time,
    office_works.id, office_works.attendence_id, office_works.purpose, office_works.comment, office_works.is_accepted
    FROM
     attendances
    LEFT JOIN office_works ON attendances.id = office_works.attendence_id
    WHERE attendances.factory_name = '${req.body.factoryName}'`, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
        console.log('Response is !', response);
        if(response && response.length && response.length > 0) {
            res.statusCode = 200;
                     res.send({
                         status: 200,
                         message: 'According to factoryName data is fetched!!!',
                         data: response,
                   });
                   res.end();
        } else {
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'According to factoryName data is not fetched!!!',
                data: response,
          });
          res.end();
        }
    })
    .catch((err) => {
        console.log('err', err);
        res.statusCode = 500;
               res.send({
                   status: 500,
                   message: 'Oops!, Something went wrong with api'
               });
               res.end();
    })
 });
};