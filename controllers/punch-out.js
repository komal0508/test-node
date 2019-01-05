const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const moment = require('moment');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/punch-out", (req, res, next) => {
   const punchOut = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    Attendance.findOne({
          where: {
          emp_id: req.body.empId,
          //[Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
      },
      order: [['createdAt', 'DESC']],
   })
        .then(resp => {
          if(resp) {
             console.log('********************');
             console.log('resp in punch out is', resp.punch_out);
             console.log('***************');
             const punchInDate = moment(resp.punch_in);
             const punchOutDate = moment(punchOut);
             const millisecondsDiff = punchOutDate.diff(punchInDate);
             console.log('millseconds', millisecondsDiff);
             const totalTimeInHoursAndMinutes = moment.utc(millisecondsDiff).format('HH:mm');
             console.log('******totalTimeInHoursAndMinutes', totalTimeInHoursAndMinutes)
            if (resp.punch_out === null) {
               Attendance.update({
                  punch_out: punchOut,
                  time_mill: millisecondsDiff,
                  total_time: totalTimeInHoursAndMinutes,
               }, {
                  where: {
                     punch_in: resp.punch_in,
                  }
               })
               .then((result) => {
                  console.log('result is', result);
                  if (result && result[0] && result.length > 0) {
                    console.log("Attendance Punch out submitted successfully!!!");
                    res.statusCode = 200;
                    res.send({
                    status: 200,
                    message: 'Attendance Punch out submitted successfully!',
             });
              res.end();
              } else {
                    console.log('Attendence Not updated!!');
                  res.statusCode = 201;
                  res.send({
                      status: 201,
                      message: 'Attendence punch out time not submitted!!!',
                  })
                  res.end();
                }
               })
               .catch((error) => {
                  console.log('error !!!', error);
               })
            } else {
               console.log('Punch out already submitted!!');
               res.statusCode = 203;
               res.send({
                  status: 203,
                  message: 'Punch out already submitted!!!',
               }); 
               res.end();
            }
          } else {
             console.log('Employee punch out submitted before punch in!!');
             res.statusCode = 205;
             res.send({
                status: 205,
                message: 'Employee punch out submitted before punch in',
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