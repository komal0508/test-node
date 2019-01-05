const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-month-filter", (req, res, next) => {
    sequelize.query(`SELECT emp_id, date, punch_in, punch_out, total_time FROM public.attendances where EXTRACT(MONTH FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year}`, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
        console.log('Response is !', response);
        if(response && response.length && response.length > 0) {
            res.statusCode = 200;
                     res.send({
                         status: 200,
                         message: 'Month wise information fetched!!!',
                         data: response,
                   });
                   res.end();
        } else {
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Month wise information not fetched!!!',
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