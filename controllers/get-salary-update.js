const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-salary-by-empId-new", (req, res, next) => {
    sequelize.query(`SELECT emp_id, SUM(time_mill) as total_milliseconds FROM public.attendances 
    WHERE EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY emp_id HAVING emp_id IN
    (SELECT emp_id FROM public.employees where factory_name = '${req.body.factoryName}')`, { type: sequelize.QueryTypes.SELECT })
    .then((users) => {
        console.log("Employee Info!!!", users);
        if (users) {
           console.log("Employee Information fetched!!!");
           res.statusCode = 200;
           res.send({
               status: 200,
               message: 'Employee Information fetched',
               data: users,
         });
         res.end();
        } else {
          console.log('Employee ID doesn\'t exist!');
          res.statusCode = 201;
          res.send({
              status: 201,
              message: 'Employee ID doesn\'t exist!',
          })
          res.end();
        }
      })
      .catch(err => {
         console.log(err);
         res.statusCode = 500;
         res.send({
             status: 500,
             message: 'Oops!, Something went wrong with api'
         });
         res.end();
      });







 })
};