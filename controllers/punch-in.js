const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/punch-in", (req, res, next) => { 
    //const date = moment(new Date()).format("YYYY-MM-DD");
  const date = moment().calendar();
    console.log('Date !!!!', date);
     const punchIn = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");


     Attendance.findOne({
      where: {
        emp_id: req.body.empId,
        is_break_time: true,
        date: moment().calender(),
    },
    order: [['createdAt', 'DESC']],
   })
        .then(data => {
          if (data) {
            const previousPunchOutMili = moment(data.punch_out).valueOf();
            const newPunchInMili = moment(punchIn).valueOf();
            const difference = newPunchInMili - previousPunchOutMili;
            if(difference < 3600000){

              const newPunchInWithDiff = newPunchInMili + difference;
              const finalPunchIn = moment(newPunchInWithDiff).format("YYYY-MM-DD hh:mm:ss");

              Attendance.create({
                emp_id: req.body.empId,
                // name: req.body.name,
                 factory_name: req.body.factoryName,
                 date: date,
                 punch_in: finalPunchIn,
                 is_break_time: false
               })
                 .then(result => {
                   console.log("Attendence info!!");
                   if (result) {
                      res.statusCode = 200;
                      res.send({
                          status: 200,
                          message: 'Employee punch In submitted successfully!',
                    });
                    res.end();
                   }
                 })
                 .catch(err => {
                    console.log(err);
                   res.statusCode = 501;
                   res.send({
                       status: 501,
                       message: 'Oops!, Something went wrong with api',
                   })
                   res.end();
                 });

            } else {

              Attendance.create({
                emp_id: req.body.empId,
                // name: req.body.name,
                 factory_name: req.body.factoryName,
                 date: date,
                 punch_in: punchIn,
                 is_break_time: false
               })
                 .then(result => {
                   console.log("Attendence info!!");
                   if (result) {
                      res.statusCode = 200;
                      res.send({
                          status: 200,
                          message: 'Employee punch In submitted successfully!',
                    });
                    res.end();
                   }
                 })
                 .catch(err => {
                    console.log(err);
                   res.statusCode = 501;
                   res.send({
                       status: 501,
                       message: 'Oops!, Something went wrong with api',
                   })
                   res.end();
                 });
            }
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

 });
};