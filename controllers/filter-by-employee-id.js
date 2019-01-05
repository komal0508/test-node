const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-id-filter", (req, res, next) => {
    Attendance.findAll({
        where: {
            emp_id: req.body.empId,
           // [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
        },
        attributes: ['emp_id', 'date', 'punch_in', 'punch_out', 'total_time' ],
    })
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