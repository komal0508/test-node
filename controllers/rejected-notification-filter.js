const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-rejected-notification-by-filter", (req, res, next) => {
    sequelize.query(`SELECT attendances.emp_id, attendances.date, attendances.factory_name, attendances.punch_in, attendances.punch_out, attendances.is_office_work, attendances.total_time,
    office_works.id, office_works.attendence_id, office_works.purpose, office_works.comment, office_works.is_accepted
    FROM
     office_works
    INNER JOIN attendances ON office_works.attendence_id = attendances.id
    WHERE office_works.is_accepted = false and attendances.factory_name = '${req.body.factoryName}'`, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
        console.log('Response is !', response);
        if(response && response.length && response.length > 0) {
            res.statusCode = 200;
                     res.send({
                         status: 200,
                         message: 'Rejected notification information fetched!!!',
                         data: response,
                   });
                   res.end();
        } else {
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Rejected notification information not fetched!!!',
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