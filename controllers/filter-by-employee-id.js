const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-id-filter", (req, res, next) => {
    // Attendance.findAll({
    //     where: {
    //         emp_id: req.body.empId,
    //     //[Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
    //     },
    //     attributes: ['emp_id', 'date', 'punch_in', 'punch_out', 'total_time' ],
    // })
    sequelize.query(`SELECT attendances.emp_id, attendances.date, attendances.punch_in, attendances.punch_out, attendances.is_office_work, attendances.total_time,
    office_works.id, office_works.attendence_id, office_works.purpose, office_works.comment, office_works.is_accepted
    FROM
     attendances
    LEFT JOIN office_works ON attendances.id = office_works.attendence_id
    WHERE attendances.emp_id = '${req.body.empId}'`, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
          console.log("Employee Info!!!");
          if (users && users.length && users.length > 0) {
              console.log("Employee Attendance Information fetched!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee Attendance Information fetched!!!',
                 data: users,
           });
           res.end();
          } else {
              console.log('Either employee name doesn\'t exist or factory name doesn\'t exist');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Either employee name doesn\'t exist or factory name doesn\'t exist!!',
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