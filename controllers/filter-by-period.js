const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-attendance-by-period-filter", (req, res, next) => {
    Attendance.findAll({
            where: {
               // date: req.body.date,
                //factory_name: req.body.factoryName,
                date: {
                    [Op.between]: [req.body.fromDate, req.body.toDate]
                }
                
            },
            attributes: ['emp_id', 'date', 'punch_in', 'punch_out', 'total_time' ],
    })
        .then(users => {
          console.log("Employee Info!!!", users);
          if (users && users.length && users.length > 0) {
              console.log("According to period data fetched");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'According to period data fetched!!!',
                 data: users,
           });
           res.end();
          } else {
              console.log('According to period data not fetched!!!');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'According to period data not fetched!!!',
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