const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const moment = require('moment');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/break-time", (req, res, next) => {
    Attendance.findOne({
          where: {
          emp_id: req.body.empId,
          //[Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
      },
      order: [['createdAt', 'DESC']],
   })
        .then(resp => {
          if(resp) {
               Attendance.update({
                is_break_time: true,
               }, {
                  where: {
                     id: resp.id,
                  }
               })
               .then((result) => {
                  console.log('result is', result);
                  if (result && result[0] && result.length > 0) {
                    console.log("Attendance Break time updated successfully!!!");
                    res.statusCode = 200;
                    res.send({
                    status: 200,
                    message: 'Attendance Break time updated successfully!',
             });
              res.end();
              } else {
                    console.log('Attendence Not updated!!');
                  res.statusCode = 201;
                  res.send({
                      status: 201,
                      message: 'Attendence break time not updated!!!',
                  })
                  res.end();
                }
               })
               .catch((error) => {
                  console.log('error !!!', error);
               })
            
          } else {
             console.log('Employee break time submitted before punch in!!');
             res.statusCode = 205;
             res.send({
                status: 205,
                message: 'Employee break time submitted before punch in',
             });
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