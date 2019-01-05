const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-date-filter", (req, res, next) => {
    Attendance.findAll({
            where: {
              //  date: req.body.date,
                //factory_name: req.body.factoryName,
                [Op.and]: [{date: req.body.date,}, {factory_name: req.body.factoryName}]
            },
            attributes: ['emp_id', 'date', 'punch_in', 'punch_out', 'total_time' ],
    })
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