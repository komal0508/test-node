const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-idperiod-filter", (req, res, next) => {
    // Attendance.findAll({
    //         where: {
    //            // date: req.body.date,
    //             //factory_name: req.body.factoryName,
    //             [Op.and]: [{ 
    //                 date: {
    //                 [Op.between]: [req.body.fromDate, req.body.toDate]
    //             }
    //         }, {emp_id: req.body.empId}]
               
                
    //         },
    //         attributes: ['emp_id', 'date', 'punch_in', 'punch_out', 'total_time' ],
    // })
    sequelize.query(`SELECT attendances.emp_id, attendances.date, attendances.punch_in, attendances.punch_out, attendances.is_office_work, attendances.total_time,
    office_works.id, office_works.attendence_id, office_works.purpose, office_works.comment, office_works.is_accepted
    FROM
     attendances
    LEFT JOIN office_works ON attendances.id = office_works.attendence_id
    WHERE attendances.date BETWEEN '${req.body.fromDate}' and '${req.body.toDate}' and attendances.emp_id = '${req.body.empId}'`, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
          console.log("Employee Info!!!", users);
          if (users && users.length && users.length > 0) {
              console.log("According to id and period data fetched");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'According to id and period data fetched!!!',
                 data: users,
           });
           res.end();
          } else {
              console.log('According to id and period data not fetched!!!');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'According to id and period data not fetched!!!',
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