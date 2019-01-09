const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-date-&-id-filter", (req, res, next) => {
    // Attendance.findAll({
    //         where: {
    //            // date: req.body.date,
    //             //factory_name: req.body.factoryName,
    //             [Op.and]: [{date: req.body.date}, {emp_id: req.body.empId}]
    //         },
    //         attributes: ['emp_id', 'date', 'punch_in', 'punch_out', 'total_time' ],
    // })
    sequelize.query(`SELECT attendances.emp_id, attendances.date, attendances.punch_in, attendances.punch_out, attendances.is_office_work, attendances.total_time,
    office_works.id, office_works.attendence_id, office_works.purpose, office_works.comment, office_works.is_accepted
    FROM
     attendances
    LEFT JOIN office_works ON attendances.id = office_works.attendence_id
    WHERE attendances.date = '${req.body.date}'  and attendances.emp_id = '${req.body.empId}'`, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
          console.log("Employee Info!!!");
          if (users && users.length && users.length > 0) {
              console.log("According to date data fetched");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'According to date data fetched!!!',
                 data: users,
           });
           res.end();
          } else {
              console.log('According to date data not fetched!!!');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'According to date data not fetched!!!',
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