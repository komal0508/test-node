const Attendance = require("../models/attendance");
const sequelize = require('../config/db');

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-currently-present-emp", (req, res, next) => {
sequelize.query(`SELECT max(DISTINCT A.emp_id) as empId, E.first_name, E.last_name FROM
public.attendances as A, public.employees as E
WHERE A.emp_id = E.emp_id and A.factory_name = '${req.body.factoryName}' and date = '${req.body.date}' and punch_out ISNULL 
GROUP BY E.first_name, E.last_name;
 `, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
          console.log("Employee Info!!!");
          if (users && users.length && users.length > 0) {
              console.log("Present emp info fetched");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Present emp info fetched!!!',
                 data: users,
           });
           res.end();
          } else {
              console.log('Present emp info not fetched');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Present emp info not fetched',
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
 });
};